import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
})
export class UserButtonComponent {
  constructor(private navCtrl: NavController) {}

  redirectToUser() {
    this.navCtrl.navigateForward('/home/user');
  }
}