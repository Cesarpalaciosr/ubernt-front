import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  bios: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private location: Location
  ) {}

  ngOnInit() {}

  // BACK+FRONT
  onSubmit() {
    this.http
      .post('https://tmdb-for-a-angularmovile.onrender.com/register', {
        name: this.name,
        email: this.email,
        alias: this.username,
        password: this.password,
        bios: this.bios,
      })
      .subscribe({
        next: (response) => {
          this.location.back();
        },
        error: (error) => {
          const alert = this.alertController
            .create({
              header: 'ERROR',
              message: error.error.msg,
              buttons: ['Dismiss'],
            })
            .then((alert) => {
              alert.present();
            });
        },
      });
  }
}
