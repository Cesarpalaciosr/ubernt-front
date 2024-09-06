import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WaitDriverComponent } from '../modals/wait-driver/wait-driver.component'; // Importa el modal WaitDriver
import { Socket , io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-location-search-modal',
  templateUrl: './location-search-modal.component.html',
  styleUrls: ['./location-search-modal.component.scss']
})
export class LocationSearchModalComponent {
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

  // private socket: Socket = io(`${this.URL}`);
  isSearching: boolean = false;
  searchResult: any = null;
  errorMessage: string = '';

  constructor(private modalController: ModalController) { }

  async dismissAndOpenWaitDriver() {
    
    
    await this.modalController.dismiss();

 
    const modal = await this.modalController.create({
      component: WaitDriverComponent,
      componentProps: {
        startLocation: this.startLocation,
        endLocation: this.endLocation,
        passenger_id: this.passenger_id,
        startLoctoback: this.startLoctoback,
        endLoctoback: this.endLoctoback
      }
      
    });
    // this.startSearch()
    console.log('soy el dimissandopenmodalwait');
    
    console.log(this.startLoctoback);
    console.log(this.endLoctoback);
    
    await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      startLocation: this.startLocation,
      endLocation: this.endLocation
    });
    // this.socket.disconnect();
  }


  // startSearch() {
  //   this.isSearching = true;
  //   this.errorMessage = '';
  //   this.searchResult = null;

  //   this.socket.emit('request_trip', {
  //     passenger_id: this.passenger_id,
  //     startLocation: this.startLoctoback,
  //     endLocation: this.endLoctoback,
  //   });
  // }

  // cancelSearch() {
  //   this.isSearching = false;
  //   this.socket.emit('cancel_trip_request', this.passenger_id);
  //   this.dismiss();
  // }
}









