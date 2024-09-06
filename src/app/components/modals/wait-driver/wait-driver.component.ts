import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Socket , io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-wait-driver',
  templateUrl: './wait-driver.component.html',
  styleUrls: ['./wait-driver.component.scss']
})
export class WaitDriverComponent implements OnInit {
  @Input() startLocation: string = ''; 
  @Input() endLocation: string = '';   
  @Input() passenger_id: string = '';   
  @Input()  startLoctoback = {
    lat: 0,
    lng: 0,
    typecoord: '',
    stringLocation: ''
  };
  @Input() endLoctoback = {
    lat: 0,
    lng: 0,
    typecoord: '',
    stringLocation: ''
  };
  private URL = environment.localURL;
  private socket: any = io(`${this.URL}`);
  isSearching: boolean = true;
  driverFound: boolean = false;
  driverInfo: any = null;
  errorMessage: string = '';
  constructor(private modalController: ModalController) {}

  ngOnInit() {
  
    // Emitir el evento para buscar conductor cuando se abre el modal
    this.startSearch();
       // Escuchar cuando se encuentra un conductor
       this.socket.on('trip_accepted', (trip: any) => {
        this.isSearching = false;
        this.driverFound = true;
        this.driverInfo = trip.driver; // Aquí puedes acceder a la información del conductor
      });
  
      // Escuchar cuando no hay conductores disponibles
      this.socket.on('no_drivers_available', () => {
        this.isSearching = false;
        this.errorMessage = 'No hay conductores disponibles en este momento.';
      });
  
      // Escuchar cuando el viaje es tomado por otro conductor
      this.socket.on('trip_taken', () => {
        this.isSearching = false;
        this.errorMessage = 'El viaje ha sido tomado por otro conductor.';
      });
      
      // this.socket.on('driver_cancelled_trip', () => {
      //   console.log('El conductor ha cancelado el viaje. Buscando otro conductor...');
      //   this.startSearch(); // Reintentar la búsqueda de otro driver
      // })
    // setTimeout(() => {
    //   this.dismiss();
    // }, 300000); // Tiempo de espera en milisegundos para 5 min
  }


   // Iniciar la búsqueda de conductor
   startSearch() {
    this.isSearching = true;
    this.errorMessage = '';
    this.driverFound = false;
    

    // Emitir el evento request_trip para iniciar la búsqueda
    this.socket.emit('request_trip', {
      passenger_id: this.passenger_id,
      startLocation: this.startLoctoback,
      endLocation: this.endLoctoback,
    });
  }

    // Cancelar la búsqueda de conductor
    cancelSearch() {
      this.isSearching = false;
      // Emitir el evento para cancelar la búsqueda
      this.socket.emit('cancel_trip_request', this.passenger_id);
      this.closeModal(null); // Cerrar el modal sin pasar datos
    }
  
    // Cerrar el modal
    closeModal(data: any) {
      this.socket.disconnect(); // Desconectar el socket si es necesario
      this.modalController.dismiss(data); // Pasar los datos al componente padre si es necesario
    }

  dismiss() {
    this.modalController.dismiss();
  }
}
