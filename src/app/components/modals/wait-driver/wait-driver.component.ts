import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wait-driver',
  templateUrl: './wait-driver.component.html',
  styleUrls: ['./wait-driver.component.scss']
})
export class WaitDriverComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {
  
    setTimeout(() => {
      this.dismiss();
    }, 300000); // Tiempo de espera en milisegundos para 5 min
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
