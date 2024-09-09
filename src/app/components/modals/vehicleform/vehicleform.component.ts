import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vehicleform',
  templateUrl: './vehicleform.component.html',
  styleUrls: ['./vehicleform.component.scss'],
})
export class VehicleformComponent  implements OnInit {

  password: string = '';
  newPassword: string = '';
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async updatePassword() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.loading = true;
    const newPassword = this.newPassword;
    const password = this.password;

    this.http
      .put(
        `https://tmdb-for-a-angularmovile.onrender.com/${value}/updatePassword`,
        {
          newPass: newPassword,
          oldPass: password,
        }
      )
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.modalController.dismiss();
        },
        error: async (error: HttpErrorResponse) => {
          this.loading = false;
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.error.message,
            buttons: ['OK'],
          });
          this.modalController.dismiss();
          await alert.present();
        },
      });
  }

  ngOnInit() {}

}
