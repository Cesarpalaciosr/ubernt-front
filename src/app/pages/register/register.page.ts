import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { newUser } from 'src/app/interfaces/user.interface';
import { NavController } from '@ionic/angular';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public TOKEN:string = environment.token;
  public URL: string = environment.localURL

  newUser : newUser = {
    fullName: '',
    ci: '',
    username: '',
    email: '',
    password: '',
    repeat_password: '',
    phoneNumber: '',
  }
  
  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  bios: string = '';
  errorMessage: string = '';
  // options = ['Opción 1', 'Opción 2', 'Opción 3'];
  // selectedOption: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private location: Location,
    private navigation: NavController,
    // private authInterceptor: AuthInterceptor
  ) {}

  ngOnInit() {
    this.getToken();

  }

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
  async getToken() {
    const token = await Preferences.get({ key: this.TOKEN });
    if (token.value) {
      this.navigation.navigateForward('/home');
    }
  }
}
