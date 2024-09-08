import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Socket , io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { TripService } from 'src/app/services/socket.service';
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
  // private socket: any = io(`${this.URL}`);
  isSearching: boolean = true;
  driverFound: boolean = false;
  driverInfo: any = null;
  errorMessage: string = '';

  availableDrivers: any[] = [];

  constructor(private modalController: ModalController,
    private socket: TripService
  ) {}

  ngOnInit() {
     // Escuchar los drivers activos
     this.socket.on('active_drivers', (drivers: any[]) => {
       
       if (drivers.length > 0) {
        console.log(drivers);
        this.isSearching = false; // Si se encuentran conductores, detener la animación
        this.availableDrivers = drivers;
      }
    });
  }

  selectDriver(driver: any) {
    console.log(driver);
    this.modalController.dismiss({
      driver: driver
    });
  }

  cancel() {
    this.modalController.dismiss();
  }

    // Cerrar el modal
    closeModal(data: any) {
      // this.socket.disconnect(); // Desconectar el socket si es necesario
      this.modalController.dismiss(data); // Pasar los datos al componente padre si es necesario
    }

  dismiss() {
    this.modalController.dismiss();
  }
}
