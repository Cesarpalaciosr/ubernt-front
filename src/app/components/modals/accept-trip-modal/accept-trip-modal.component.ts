import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripService } from 'src/app/services/socket.service';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@Component({
  selector: 'app-accept-trip-modal',
  templateUrl: './accept-trip-modal.component.html',
  styleUrls: ['./accept-trip-modal.component.scss'],
})
export class AcceptTripModalComponent {
  @Input() tripRequest: any;
  @Input() driver_id: any;

  constructor(private modalController: ModalController, private socketService: TripService) { }

  public async acceptTrip() {
    await this.modalController.dismiss({ accepted: true });
    console.log('soy el this.tripRequest');
    console.log(this.tripRequest);
    
    await this.socketService.emit('accept_trip', {
      data: this.tripRequest,
      driver_id: this.driver_id,
      passenger_id: this.tripRequest.passenger_id
    });
    // await this.socketService.on('trip_accepted', (data: any) => {
    //   console.log(data);
    //   // const privateChat = this.modalController.create({
    //   //   component: ChatModalComponent,
    //   //   componentProps: {
    //   //     user: data.driver._id,
    //   //     participants: [data.driver.username, data.passenger.username],
    //   //     roomId: data.passenger._id + data.driver._id
    //   //   },
    //   // }).then((privateChat) => {
    //   //   privateChat.present();
    //   // })
    // });
    await this.modalController.dismiss();
  }

  public async rejectTrip() {
    await this.modalController.dismiss({ accepted: false });
    await this.modalController.dismiss();
  }
}
