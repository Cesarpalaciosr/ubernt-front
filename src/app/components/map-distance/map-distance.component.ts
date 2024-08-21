import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { LocationSearchModalComponent } from '../location-search-modal/location-search-modal.component';

@Component({
  selector: 'app-map-distance',
  templateUrl: './map-distance.component.html',
  styleUrls: ['./map-distance.component.scss']
})
export class MapDistanceComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private startMarker!: L.Marker;
  private endMarker!: L.Marker;
  private routeLayer!: L.LayerGroup;

  public startLocation: string = '';
  public endLocation: string = '';
  public distance: string = '';

  private readonly DEFAULT_ZOOM_LEVEL = 25;
  private readonly DEFAULT_LOCATION = { lat: 10.649495, lng: -71.596806 };

  constructor(private http: HttpClient, private modalController: ModalController) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.DEFAULT_LOCATION.lat, this.DEFAULT_LOCATION.lng], this.DEFAULT_ZOOM_LEVEL);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.addDefaultMarker();
    this.locateUser();
    this.setupClickHandler();
  }

  private addDefaultMarker(): void {
    const customIcon = L.icon({
      iconUrl: 'https://uru.edu/wp-content/uploads/2023/08/uru-logo-seo.png',
      iconSize: [100, 100],
      iconAnchor: [50, 100],
      popupAnchor: [0, -100]
    });

    L.marker([this.DEFAULT_LOCATION.lat, this.DEFAULT_LOCATION.lng], { icon: customIcon })
      .addTo(this.map)
      .bindPopup('Universidad Rafael Urdaneta');
  }

  private locateUser(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          this.map.setView([lat, lng], this.DEFAULT_ZOOM_LEVEL);

          L.marker([lat, lng], {
            icon: L.divIcon({
              html: '<ion-icon name="locate-outline" style="font-size: 2rem; color: red;"></ion-icon>',
              iconSize: [40, 40],
              className: 'custom-icon'
            })
          }).addTo(this.map).bindPopup('Your current location').openPopup();

        },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              alert('The request to get user location timed out.');
              break;
            default:
              alert('An unknown error occurred.');
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }

  private setupClickHandler(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (!this.startMarker) {
        this.startMarker = L.marker(e.latlng, {
          icon: L.divIcon({
            html: '<ion-icon name="location-sharp" style="font-size: 2rem; color: blue;"></ion-icon>',
            iconSize: [40, 40],
            className: 'custom-icon'
          }),
          draggable: false //se puede ajusta para ponerle funcionalidad y que se ajuste cuando se cambie el pointer
        }).addTo(this.map)
          .bindPopup('Start Point')
          .openPopup();
        this.getLocationName(e.latlng.lat, e.latlng.lng, 'start');
      } else if (!this.endMarker) {
        this.endMarker = L.marker(e.latlng, {
          icon: L.divIcon({
            html: '<ion-icon name="location-sharp" style="font-size: 2rem; color: purple;"></ion-icon>',
            iconSize: [40, 40],
            className: 'custom-icon'
          }),
          draggable: false //se puede ajusta para ponerle funcionalidad y que se ajuste cuando se cambie el pointer
        }).addTo(this.map)
          .bindPopup('End Point')
          .openPopup();
        this.getLocationName(e.latlng.lat, e.latlng.lng, 'end');
        this.calculateRoute();
      } else {
        this.map.removeLayer(this.startMarker);
        this.map.removeLayer(this.endMarker);
        this.routeLayer?.clearLayers();
        this.startMarker = undefined!;
        this.endMarker = undefined!;
        this.startLocation = '';
        this.endLocation = '';
        this.distance = '';
      }
    });
  }

  private calculateRoute(): void {
    if (!this.startMarker || !this.endMarker) {
      console.error('Both start and end markers are required to calculate route.');
      return;
    }

    const start = this.startMarker.getLatLng();
    const end = this.endMarker.getLatLng();

    const apiKey = '5b3ce3597851110001cf62483d78c961eb984a10809db54753ce8a50';
    const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

    this.http.get(url).subscribe((data: any) => {
      const coords = data.features[0].geometry.coordinates;
      const latLngs = coords.map((coord: number[]) => new L.LatLng(coord[1], coord[0]));

      if (this.routeLayer) {
        this.routeLayer.clearLayers();
      }

      this.routeLayer = L.layerGroup([
        L.polyline(latLngs, { color: 'purple' })
      ]).addTo(this.map);

      this.calculateDistance(start, end);
    }, error => {
      console.error('Error fetching route:', error);
    });
  }

  private calculateDistance(start: L.LatLng, end: L.LatLng): void {
    const distanceInMeters = this.map.distance(start, end);
    this.distance = `${(distanceInMeters / 1000).toFixed(2)} km`;
  }

  private getLocationName(lat: number, lng: number, type: 'start' | 'end'): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

    this.http.get(url).subscribe((data: any) => {
      const address = data.address;
      let locationName = '';

      if (address.road) {
        locationName += address.road;
      }
      if (address.suburb) {
        locationName += locationName ? `, ${address.suburb}` : address.suburb;
      }
      if (address.city) {
        locationName += locationName ? `, ${address.city}` : address.city;
      }

      if (!locationName && address.neighbourhood) {
        locationName = address.neighbourhood;
      }

      if (!locationName && address.city) {
        locationName = address.city;
      }

      if (!locationName && address.state) {
        locationName = address.state;
      }

      if (!locationName && address.country) {
        locationName = address.country;
      }

      if (type === 'start') {
        this.startLocation = locationName;
      } else {
        this.endLocation = locationName;
      }
    }, error => {
      console.error('Error fetching location name:', error);
    });
  }

  public async openSearchModal() {
    const modal = await this.modalController.create({
      component: LocationSearchModalComponent,
      componentProps: {
        startLocation: this.startLocation,
        endLocation: this.endLocation,
         cssClass: 'my-custom-class'
      }
    });
  
    modal.onDidDismiss().then((detail) => {
      if (detail !== null && detail.data) {
        const { startLocation, endLocation } = detail.data;
  
      
        if (this.startLocation !== startLocation) {
          this.startLocation = startLocation;
          this.onLocationInputChange('start');
        }
        if (this.endLocation !== endLocation) {
          this.endLocation = endLocation;
          this.onLocationInputChange('end');
        }
      }
    });
  
    await modal.present();
  }
  
  public onLocationInputChange(type: 'start' | 'end'): void {
    if (type === 'start' && this.startLocation) {
      this.geocodeLocation(this.startLocation, 'start');
    } else if (type === 'end' && this.endLocation) {
      this.geocodeLocation(this.endLocation, 'end');
    }
  }
  
  private geocodeLocation(location: string, type: 'start' | 'end'): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&addressdetails=1&limit=1`;
  
    this.http.get(url).subscribe((data: any) => {
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const latLng = new L.LatLng(lat, lng);
  
        
        if (type === 'start' && (!this.startMarker || this.startMarker.getLatLng().distanceTo(latLng) > 10)) {
          if (this.startMarker) {
            this.map.removeLayer(this.startMarker);
          }
          this.startMarker = L.marker(latLng, {
            icon: L.divIcon({
              html: '<ion-icon name="location-sharp" style="font-size: 2rem; color: blue;"></ion-icon>',
              iconSize: [40, 40],
              className: 'custom-icon'
            }),
            draggable: true
          }).addTo(this.map).bindPopup('Start Point').openPopup();
  
          this.map.setView(latLng, this.DEFAULT_ZOOM_LEVEL);
        } else if (type === 'end' && (!this.endMarker || this.endMarker.getLatLng().distanceTo(latLng) > 10)) {
          if (this.endMarker) {
            this.map.removeLayer(this.endMarker);
          }
          this.endMarker = L.marker(latLng, {
            icon: L.divIcon({
              html: '<ion-icon name="location-sharp" style="font-size: 2rem; color: purple;"></ion-icon>',
              iconSize: [40, 40],
              className: 'custom-icon'
            }),
            draggable: true
          }).addTo(this.map).bindPopup('End Point').openPopup();
  
          this.map.setView(latLng, this.DEFAULT_ZOOM_LEVEL);
        }
  
        if (this.startMarker && this.endMarker) {
          this.calculateRoute();
        }
      } else {
        alert('Location not found.');
      }
    }, error => {
      console.error('Error fetching geocode:', error);
    });
  }

  onStatusChange(status: boolean) {
    console.log('Switch status:', status ? 'ON' : 'OFF');
  }
}