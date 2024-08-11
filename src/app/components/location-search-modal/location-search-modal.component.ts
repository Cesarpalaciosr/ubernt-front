import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-location-search-modal',
  templateUrl: './location-search-modal.component.html',
  styleUrls: ['./location-search-modal.component.scss']
})
export class LocationSearchModalComponent {
  @Input() startLocation: string = '';
  @Input() endLocation: string = '';

  constructor(private modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss({
      startLocation: this.startLocation,
      endLocation: this.endLocation
    });
  }
}




