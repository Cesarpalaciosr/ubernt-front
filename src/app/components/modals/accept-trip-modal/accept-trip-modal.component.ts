import { Component, OnInit , Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-accept-trip-modal',
  templateUrl: './accept-trip-modal.component.html',
  styleUrls: ['./accept-trip-modal.component.scss'],
})
export class AcceptTripModalComponent {
  @Input() tripRequest: any;
  @Input() driver_id: any;
  
  constructor(private modalController: ModalController, private socketService: TripService) { }

  acceptTrip() {
    this.socketService.emit('accept_trip', {
      driver_id: this.driver_id,
      passenger_id: this.tripRequest.passenger_id
    });
    this.modalController.dismiss();
  }

  rejectTrip() {
    this.modalController.dismiss();
  }
}
