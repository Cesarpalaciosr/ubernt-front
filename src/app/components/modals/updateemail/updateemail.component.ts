import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-updateemail',
  templateUrl: './updateemail.component.html',
  styleUrls: ['./updateemail.component.scss'],
})
export class UpdateemailComponent implements OnInit {
  password: string = '';
  email: string = '';
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async updateEmail() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.loading = true;
    const email = this.email;
    const password = this.password;

    this.http
      .put(
        `https://tmdb-for-a-angularmovile.onrender.com/${value}/updateEmail`,
        {
          email: email,
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
