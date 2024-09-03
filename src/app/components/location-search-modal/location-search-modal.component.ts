import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WaitDriverComponent } from '../modals/wait-driver/wait-driver.component'; // Importa el modal WaitDriver

@Component({
  selector: 'app-location-search-modal',
  templateUrl: './location-search-modal.component.html',
  styleUrls: ['./location-search-modal.component.scss']
})
export class LocationSearchModalComponent {
  @Input() startLocation: string = ''; 
  @Input() endLocation: string = '';   

  constructor(private modalController: ModalController) { }

  async dismissAndOpenWaitDriver() {
 
    await this.modalController.dismiss();

 
    const modal = await this.modalController.create({
      component: WaitDriverComponent,
      componentProps: {
        startLocation: this.startLocation,
        endLocation: this.endLocation,
        
        
      }

    });
    await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      startLocation: this.startLocation,
      endLocation: this.endLocation
    });
  }
}









