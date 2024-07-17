import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import axios from 'axios';
import { ViewWillEnter } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-map-distance',
  templateUrl: '../components/map-distance/map-distance.component.html',
  styleUrls: ['../components/map-distance/map-distance.component.scss']
})
export class MapDistanceComponent implements ViewWillEnter, OnInit, OnDestroy {
  private map: L.Map | null = null;
  private startPoint: L.LatLng | null = null;
  private endPoint: L.LatLng | null = null;
  private distance: number | null = null;
  private locationMarker: L.Marker | null = null;
  private watchId: number | null = null;
  private routeLayer: L.Layer | null = null;  // Nueva capa para la ruta

  // Propiedades para manejar nombres de ubicaciones
  startLocationName: string = '';
  endLocationName: string = '';
  locationSuggestions: any[] = [];  // Lista para las sugerencias de ubicaciones



  // <uses-permission android: name = "android.permission.ACCESS_COARSE_LOCATION" />
  // <uses-permission android: name = "android.permission.ACCESS_FINE_LOCATION" />
  // <uses-feature android: name = "android.hardware.location.gps" />

  constructor() { }

  async ngOnInit() {
    console.log("test");
    //await navigator.geolocation.getCurrentPosition(this.successInit, this.errorInit)
    await Geolocation.getCurrentPosition().then((position: any) => {
      //console.log(position.coords.latitude, position.coords.longitude);
      this.successInit(position.coords)
    }
    )
      .catch((err) => {
        console.log('Error getting location', err);
      }
      );
  }


  async ionViewWillEnter(): Promise<void> {
    // await this.initMap();
    await navigator.geolocation.getCurrentPosition(this.successInit, this.errorInit)
    console.log("test");
    const test = () => {
      console.log("test")
      Geolocation.getCurrentPosition().then((position) => {
        console.log('Current', position);
      })
        .catch((err) => {
          console.log('Error getting location', err);
        }
        );
    }
    await test();
  }

  private async successInit(position: any): Promise<void> {
    console.log("cositas xdxd ", position.latitude, position.longitude);
    const UserLat: any = position.latitude;
    const UserLng: any = position.longitude;
    console.log(UserLat, UserLng);
    const zoom = 15;
    await this.initMap(UserLat, UserLng, zoom)

  }

  private async errorInit() {
    await this.initMap(0, 0, 15)
  }

  public async initMap(UserLat: any, UserLng: any, zoom: any): Promise<void> {
    this.map = L.map('map').setView([UserLat, UserLng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.onMapClick(e);
    });

    this.setCurrentLocation();
  }

  private onMapClick(e: L.LeafletMouseEvent): void {
    if (!this.startPoint) {
      this.startPoint = e.latlng;
      L.marker(this.startPoint).addTo(this.map!)
        .bindPopup('Start Point')
        .openPopup();
    } else if (!this.endPoint) {
      this.endPoint = e.latlng;
      L.marker(this.endPoint).addTo(this.map!)
        .bindPopup('End Point')
        .openPopup();

      this.calculateDistance();
      this.traceRoute();  // Llamar a la función para trazar la ruta
    }
  }

  private async traceRoute(): Promise<void> {
    if (this.startPoint && this.endPoint) {
      const [startLat, startLon] = [this.startPoint.lat, this.startPoint.lng];
      const [endLat, endLon] = [this.endPoint.lat, this.endPoint.lng];

      try {
        const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
          params: {
            start: `${startLon},${startLat}`,
            end: `${endLon},${endLat}`,
            api_key: '5b3ce3597851110001cf62483d78c961eb984a10809db54753ce8a50',  // Reemplaza con tu propia API Key de OpenRouteService
            format: 'geojson'
          }
        });

        if (this.routeLayer) {
          this.map!.removeLayer(this.routeLayer);
        }

        const routeGeoJSON = response.data;
        this.routeLayer = L.geoJSON(routeGeoJSON, {
          style: {
            color: '#800080',  // Color morado para la ruta
            weight: 5,
            opacity: 0.75  // Aumentar la opacidad para una mejor visibilidad
          }
        }).addTo(this.map!);

        this.map!.fitBounds(L.geoJSON(routeGeoJSON).getBounds());

      } catch (error) {
        console.error(error);
        alert('Error retrieving route');
      }
    }
  }

  private calculateDistance(): void {
    if (this.startPoint && this.endPoint) {
      this.distance = this.startPoint.distanceTo(this.endPoint);
      alert(`Distance: ${this.distance.toFixed(2)} meters`);
    }
  }

  private setCurrentLocation(): void {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = position.coords;
          const latLng = L.latLng(coords.latitude, coords.longitude);

          if (this.map) {
            this.map.setView(latLng, 13);
          }

          if (this.locationMarker) {
            this.locationMarker.setLatLng(latLng);
          } else {
            this.locationMarker = L.marker(latLng).addTo(this.map!)
              .bindPopup('Current Location')
              .openPopup();
          }
        },
        (error) => {
          console.error(error);
          alert('Unable to retrieve your location');
        },
        {
          enableHighAccuracy: true,  // Solicitar la ubicación más precisa disponible
          timeout: 5000,            // Tiempo máximo de espera para obtener una ubicación
          maximumAge: 0            // No usar ubicaciones almacenadas
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }

  public async updateStartLocation(): Promise<void> {
    if (this.startLocationName) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: `${this.startLocationName}, Zulia, Venezuela`,
            format: 'json',
            limit: 5  // Obtener hasta 5 sugerencias
          }
        });

        this.locationSuggestions = response.data.map((loc: any) => ({
          name: loc.display_name,
          lat: loc.lat,
          lon: loc.lon
        }));
      } catch (error) {
        console.error(error);
        alert('Error retrieving location');
      }
    }
  }

  public async updateEndLocation(): Promise<void> {
    if (this.endLocationName) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: `${this.endLocationName}, Zulia, Venezuela`,
            format: 'json',
            limit: 5  // Obtener hasta 5 sugerencias
          }
        });

        this.locationSuggestions = response.data.map((loc: any) => ({
          name: loc.display_name,
          lat: loc.lat,
          lon: loc.lon
        }));
      } catch (error) {
        console.error(error);
        alert('Error retrieving location');
      }
    }
  }

  public selectSuggestion(suggestion: any): void {
    const latLng = L.latLng(suggestion.lat, suggestion.lon);

    if (!this.startPoint) {
      this.startPoint = latLng;
      L.marker(this.startPoint).addTo(this.map!)
        .bindPopup('Start Point')
        .openPopup();
      this.startLocationName = suggestion.name;
    } else if (!this.endPoint) {
      this.endPoint = latLng;
      L.marker(this.endPoint).addTo(this.map!)
        .bindPopup('End Point')
        .openPopup();
      this.endLocationName = suggestion.name;

      this.calculateDistance();
      this.traceRoute();  // Llamar a la función para trazar la ruta
    }

    this.map?.setView(latLng, 13);
    this.locationSuggestions = [];  // Clear the suggestions list
  }

  ngOnDestroy(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}
