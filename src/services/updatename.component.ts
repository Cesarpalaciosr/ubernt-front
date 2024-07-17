import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-updatename',
  templateUrl: '../components/updatename/updatename.component.html',
  styleUrls: ['../components/updatename/updatename.component.scss'],
})
export class UpdatenameComponent implements OnInit {
  password: string = '';
  name: string = '';
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async updateName() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.loading = true;
    const name = this.name;
    const password = this.password;

    this.http
      .put(
        `https://tmdb-for-a-angularmovile.onrender.com/${value}/updateName`,
        {
          name: name,
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
