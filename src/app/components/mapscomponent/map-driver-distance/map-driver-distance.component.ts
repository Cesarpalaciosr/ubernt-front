import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';
import { ModalController } from '@ionic/angular';
import { TripService } from 'src/app/services/socket.service';
import { AcceptTripModalComponent } from '../../modals/accept-trip-modal/accept-trip-modal.component';
import { ChatModalComponent } from '../../modals/chat-modal/chat-modal.component';

@Component({
  selector: 'app-map-driver-distance',
  templateUrl: './map-driver-distance.component.html',
  styleUrls: ['./map-driver-distance.component.scss']
})
export class MapDriverDistanceComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: L.Map;
  private startMarker!: L.Marker;
  private endMarker!: L.Marker;
  private currentLocationMarker!: L.Marker;
  private routeLayer!: L.LayerGroup;
  private fuchsiaRouteLayer!: L.LayerGroup;
  private locationWatchId: number | undefined;
  private URL = environment.localURL;
  public readonly DEFAULT_ZOOM_LEVEL = 15; //no se si tengo que ponerlo publico o privado
  public START_LOCATION = { lat: 10.649495, lng: -71.596806 }; // Universidad Rafael Urdaneta
  public END_LOCATION = { lat: 10.683081, lng: -71.607131 }; // Universidad Rafael Belloso Chacín

  public showStartNavigationButton = false;
  public showStartPassengerNavigationButton = false;
  public showEndTripButton = false;
  public showEndRideButton = false;
  public firstNavigationCompleted = false;


  showBubbles: boolean = false; // Estado para controlar la visibilidad de las burbujas
  chatData: any; // Datos del chat para pasarlos al modal y a las burbujas

  startLoctoback = {
    lat: 0,
    lng: 0,
    typecoord: '',
    stringLocation: ''
  };
  endLoctoback = {
    lat: 0,
    lng: 0,
    typecoord: '',
    stringLocation: ''
  };


  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private authInterceptor: AuthInterceptor,
    private socket: TripService,
  ) {
      // Evento cuando se finaliza el viaje
      this.socket.on("finish_trip", () => {
        console.log('Viaje finalizado');
        // Ocultar las burbujas cuando finalice el viaje
        this.showBubbles = false;
      });
    this.socket.on("trip_accepted", (data: any) => {
      console.log('Viaje aceptado');
      console.log('soy la vista driver');
      
      console.log(data);
      
      this.chatData = {
        top: data.passenger.fullName,
        user: data.driver._id,
        participants: [data.driver.username, data.passenger.username],
        roomId: data.passenger._id + data.driver._id
      }
      // Mostrar las burbujas
      this.showBubbles = true;
      const privateChat = this.modalController.create({
        component: ChatModalComponent,
        componentProps: this.chatData

      }).then((privateChat) => {
        privateChat.present();
      })
    })
  }

  driver_id: string | null = null; // Reemplaza con el ID real del driver
  status: 'active' | 'inactive' = 'inactive'; // Estado inicial
  tripRequest: any = null;
  tripAccepted: boolean = false;
  tripDetails: any = null;

  async ngOnInit() {
    this.driver_id = await this.authInterceptor.getUserID();
    // Escuchar cuando el driver active su estado
    this.socket.on('driver_activated', (driverId: string) => {
      if (driverId === this.driver_id) {
        console.log('Tu estado es ahora activo');
      }
    });

    // Escuchar cuando el driver desactive su estado
    this.socket.on('driver_deactivated', (driverId: string) => {
      if (driverId === this.driver_id) {
        console.log('Tu estado es ahora inactivo');
      }
    });
      // Evento cuando se finaliza el viaje
      this.socket.on("finish_trip", () => {
        console.log('Viaje finalizado');
        // Ocultar las burbujas cuando finalice el viaje
        this.showBubbles = false;
      });
    //Logica del socket
    this.socket.on('trip_request', async (data: any) => {
      console.log('Solicitud de viaje recibida:', data);

      // console.log(data);

      this.tripRequest = data;
      const modal = await this.modalController.create({
        component: AcceptTripModalComponent,
        componentProps: {
          tripRequest: this.tripRequest,
          driver_id: this.driver_id
        }
      });

      await modal.present();
        // Capturar la respuesta del modal
      const { data: result } = await modal.onWillDismiss();

      // Si el viaje fue aceptado
      if (result?.accepted) {
        this.showStartNavigationButton = true;
        console.log('El viaje fue aceptado. soy el if');
        this.START_LOCATION = {lat: data.data.startLoctoback.lat, lng: data.data.startLoctoback.lng }
        this.END_LOCATION = {lat: data.data.endLoctoback.lat, lng: data.data.endLoctoback.lng }
        // console.log(data.data.startLoctoback.lat);
        // console.log(this.START_LOCATION);
        
        this.addMarkers();
        this.showPassengerRoute();
        // this.acceptTrip(); // Función que maneja la lógica de aceptar viaje
        // this.paintRoutesFromTripRequest(); // Función para pintar las rutas en el mapa
      } else {
        console.log('El viaje fue rechazado tambien soyy el if');
        // this.rejectTrip(); // Función que maneja la lógica de rechazo de viaje
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.showInitialView(); // Mostrar la vista inicial antes de pedir la ubicación en tiempo real
    setTimeout(() => this.locateDriver(), 2000); // Delay para asegurar que la vista inicial se renderice primero
  }

  ngOnDestroy(): void {
    if (this.locationWatchId) {
      navigator.geolocation.clearWatch(this.locationWatchId);
    }

    this.socket.disconnect(); // Desconectar el socket al destruir el componente
  }
  // Función para abrir el chat desde las burbujas
  openChatFromBubbles() {
    if (this.chatData) {
      this.modalController.create({
        component: ChatModalComponent,
        componentProps: this.chatData,
      }).then(modal => modal.present());
    }
  }
  /*  ///\\\  */
  /*  \\\///  */

  // Aceptar el viaje
  acceptTrip() {
    if (this.tripRequest) {
      this.socket.emit('accept_trip', {
        driver_id: this.driver_id,
        passenger_id: this.tripRequest.passenger_id,
        start_location_id: this.tripRequest.start_location_id,
        end_location_id: this.tripRequest.end_location_id,
        vehicle_id: 'vehicle_id_example', // Reemplaza con el ID del vehículo del driver
      });
    }
  }

  // Rechazar el viaje
  rejectTrip() {
    this.tripRequest = null; // Limpiar la solicitud del viaje
    // Puedes agregar lógica adicional aquí si deseas notificar al servidor
  }

  // Cancelar el viaje
  cancelTrip() {
    if (this.tripDetails) {
      this.socket.emit('cancel_trip', {
        driver_id: this.driver_id,
        trip_id: this.tripDetails._id,
      });
      this.tripAccepted = false;
      this.tripDetails = null;
    }
  }

  /*  ///\\\  */
  /*  \\\///  */


  private initMap(): void {
    this.map = L.map('map', {
      center: [this.START_LOCATION.lat, this.START_LOCATION.lng],
      zoom: this.DEFAULT_ZOOM_LEVEL,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ],
      zoomControl: false
    });

    this.routeLayer = L.layerGroup().addTo(this.map);
    this.fuchsiaRouteLayer = L.layerGroup().addTo(this.map);

    
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }

  private addMarkers(): void {
    const startIcon = L.divIcon({
      html: '<ion-icon name="location-sharp" style="font-size: 2rem; color: blue;"></ion-icon>',
      iconSize: [40, 40],
      className: 'custom-icon'
    });

    const endIcon = L.divIcon({
      html: '<ion-icon name="location-sharp" style="font-size: 2rem; color: purple;"></ion-icon>',
      iconSize: [40, 40],
      className: 'custom-icon'
    });

    this.startMarker = L.marker([this.START_LOCATION.lat, this.START_LOCATION.lng], { icon: startIcon })
      .addTo(this.map)
      .bindPopup('Universidad Rafael Urdaneta');

    this.endMarker = L.marker([this.END_LOCATION.lat, this.END_LOCATION.lng], { icon: endIcon })
      .addTo(this.map)
      .bindPopup('Universidad Rafael Belloso Chacín');

    this.map.fitBounds([
      [this.START_LOCATION.lat, this.START_LOCATION.lng],
      [this.END_LOCATION.lat, this.END_LOCATION.lng]
    ]);
  }

  private showInitialView(): void {
    this.map.setView([this.START_LOCATION.lat, this.START_LOCATION.lng], this.DEFAULT_ZOOM_LEVEL);
  }

  private locateDriver(setRoute: boolean = true): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          

          const driverIcon = L.divIcon({
            html: '<ion-icon name="car-sport" style="font-size: 2rem; color: black;"></ion-icon>',
            iconSize: [40, 40],
            className: 'custom-icon'
          });

          if (this.currentLocationMarker) {
            this.map.removeLayer(this.currentLocationMarker);
          }

          this.currentLocationMarker = L.marker([lat, lng], { icon: driverIcon })
            .addTo(this.map)
            .bindPopup('Your Current Location')
            .openPopup();

          this.map.setView([lat, lng], this.DEFAULT_ZOOM_LEVEL);
          
          // if (setRoute) {
          //   const currentLocation = L.latLng(lat, lng);
          //   const start = this.startMarker.getLatLng();

          //   const options: L.PolylineOptions = {
          //     color: 'fuchsia',
          //     dashArray: '5, 10',
          //     weight: 4,
          //     opacity: 0.9
          //   };

          //   this.drawRoute(currentLocation, start, options, this.fuchsiaRouteLayer);
          // }
        },
        error => {
          console.error('Error getting current location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }

  private drawRoute(start: L.LatLng, end: L.LatLng, options: L.PolylineOptions, layer: L.LayerGroup): void {
    const apiKey = '5b3ce3597851110001cf62483d78c961eb984a10809db54753ce8a50';
    const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

    this.http.get(url).subscribe((data: any) => {
      const coords = data.features[0].geometry.coordinates;
      const latLngs = coords.map((coord: number[]) => new L.LatLng(coord[1], coord[0]));

      const polyline = L.polyline(latLngs, options);
      layer.addLayer(polyline);
    }, error => {
      console.error('Error fetching route:', error);
    });
  }

  private showDriverRoute(start:any){
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const currentLocation = L.latLng(lat, lng);
        
            const options: L.PolylineOptions = {
              color: 'fuchsia',
              dashArray: '5, 10',
              weight: 4,
              opacity: 0.9
            };
        
            this.drawRoute(currentLocation, start, options, this.fuchsiaRouteLayer);

      })
    
  }

  private showPassengerRoute(): void {
    const start = this.startMarker.getLatLng();
    const end = this.endMarker.getLatLng();

    const options: L.PolylineOptions = {
      color: 'purple',
      weight: 4,
      opacity: 0.9
    };
    this.showDriverRoute(start);
    this.drawRoute(start, end, options, this.routeLayer);
  }



  hideButtonStartNavigation(){
    this.showStartPassengerNavigationButton = true
    this.showStartNavigationButton = false
    this.showEndRideButton = false
    this.startNavigation()
  }
  
  hideButtonStartPassengerNavigation(){
    this.showEndRideButton = true
    this.showStartPassengerNavigationButton = false
    this.showStartNavigationButton = false
    this.startPassengerNavigation()
  }

  hideButtonEndRide(){
    this.showEndRideButton = false
    this.showStartPassengerNavigationButton = false
    this.showStartNavigationButton = false
    this.finishRide()
  }









  public startNavigation(): void {
    if (!this.firstNavigationCompleted) {
      const currentLocation = this.currentLocationMarker.getLatLng();
      const start = this.startMarker.getLatLng();

      const options: L.PolylineOptions = {
        color: 'red',
        weight: 4,
        opacity: 0.9
      };

      this.calculateRoute(currentLocation, start, options, () => {
        this.handleArrivalAtStartLocation();
        this.firstNavigationCompleted = true;
      });
    }
  }

  public startPassengerNavigation(): void {
    const start = this.startMarker.getLatLng();
    const end = this.endMarker.getLatLng();

    const options: L.PolylineOptions = {
      color: 'purple',
      weight: 4,
      opacity: 0.9
    };

    this.calculateRoute(start, end, options, this.handleArrivalAtEndLocation.bind(this));
  }

  public finishRide(): void {

    this.socket.emit('finish_trip', null)
    // Borra todas las rutas y marcadores existentes
    this.routeLayer.clearLayers();
    this.fuchsiaRouteLayer.clearLayers();
    

    if (this.startMarker) {
      this.map.removeLayer(this.startMarker);
    }
    if (this.endMarker) {
      this.map.removeLayer(this.endMarker);
    }
    if (this.currentLocationMarker) {
      this.map.removeLayer(this.currentLocationMarker);
    }
    setTimeout(() => this.locateDriver(), 2000);

    // Oculta los botones relacionados con la navegación
    // this.showStartNavigationButton = true;
    // this.showStartPassengerNavigationButton = false;
    // this.showEndTripButton = false;
    // this.showEndRideButton = false;

    // Lee la ubicación actual pero sin establecer ninguna ruta
    this.locateDriver(false);
  }


  private calculateRoute(start: L.LatLng, end: L.LatLng, options: L.PolylineOptions, onArrival: () => void): void {
    const apiKey = '5b3ce3597851110001cf62483d78c961eb984a10809db54753ce8a50';
    const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

    this.http.get(url).subscribe((data: any) => {
      const coords = data.features[0].geometry.coordinates;
      const latLngs = coords.map((coord: number[]) => new L.LatLng(coord[1], coord[0]));

      this.simulateDriverMovement(latLngs, onArrival, options);
    }, error => {
      console.error('Error fetching route:', error);
    });
  }

  private simulateDriverMovement(latLngs: L.LatLng[], onArrival: () => void, options: L.PolylineOptions): void {
    const speed = 1 * 1000 / 3600;
    let index = 0;

    const moveCar = () => {
      if (index < latLngs.length) {
        if (this.currentLocationMarker) {
          this.map.removeLayer(this.currentLocationMarker);
        }

        const driverIcon = L.divIcon({
          html: '<ion-icon name="car-sport" style="font-size: 2rem; color: black;"></ion-icon>',
          iconSize: [40, 40],
          className: 'custom-icon'
        });

        this.currentLocationMarker = L.marker(latLngs[index], { icon: driverIcon }).addTo(this.map);
        this.map.setView(latLngs[index], this.DEFAULT_ZOOM_LEVEL);

        index++;
        if (index < latLngs.length) {
          const distance = this.getDistanceBetweenPoints(latLngs[index - 1], latLngs[index]);
          const duration = (distance / speed) * 1000; // Convertir a milisegundos
          setTimeout(moveCar, duration);
        } else {
          onArrival();
        }
      }
    };

    moveCar();
  }

  private getDistanceBetweenPoints(point1: L.LatLng, point2: L.LatLng): number {
    const latDiff = point2.lat - point1.lat;
    const lngDiff = point2.lng - point1.lng;
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  }

  private handleArrivalAtStartLocation(): void {
    // this.showStartNavigationButton = false;
    // this.showStartPassengerNavigationButton = true;
    this.fuchsiaRouteLayer.clearLayers(); // Borra la ruta fucsia al llegar al punto de inicio
    // this.showEndRideButton = true; // Muestra el botón End Ride
  }

  private handleArrivalAtEndLocation(): void {
    // this.showStartPassengerNavigationButton = false;
    // this.showEndTripButton = true;
  }
onMapClick() {
  // Asegúrate de que este método no oculte ni modifique los botones
  console.log('Mapa clicado');
}
  onStatusChange(status: boolean): void {
    console.log('Switch status:', status ? 'ON' : 'OFF');
    if (status == true) {
      this.status = 'active'
      // Emitir el cambio de estado al servidor
      // Emitir el cambio de estado al servidor
      this.socket.emit('driver_status_change', {
        driver_id: this.driver_id,
        status: this.status
      });
    } else {
      this.status = 'inactive'
      // Emitir el cambio de estado al servidor
      // Emitir el cambio de estado al servidor
      this.socket.emit('driver_status_change', {
        driver_id: this.driver_id,
        status: this.status
      });
    }


    if (!status && (this.routeLayer.getLayers().length > 0 || this.fuchsiaRouteLayer.getLayers().length > 0)) {
      // Mostrar alerta si hay rutas activas y el usuario intenta apagar el switch
      alert('No puedes apagar el switch porque hay una ruta activa.');
      return;
    }

    // Cambiar el color del marcador si no hay rutas activas
    const carColor = status ? 'black' : 'gray';

    if (this.currentLocationMarker) {
      const driverIcon = L.divIcon({
        html: `<ion-icon name="car-sport" style="font-size: 2rem; color: ${carColor};"></ion-icon>`,
        iconSize: [40, 40],
        className: 'custom-icon'
      });

      this.currentLocationMarker.setIcon(driverIcon);
    }
  }
}





