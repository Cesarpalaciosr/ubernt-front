import { Component, OnInit } from '@angular/core';
import { existingUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public TOKEN:string = environment.token;
  private localURL = environment.localURL;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private navigation: NavController,
    private location: Location
  ) {}
  existingUser : existingUser = {
    userInfo: '',
    password: ''
  }
  
  
  ngOnInit() {
    
    this.getToken();
    this.existingUser = {
      userInfo: 'radsylph2',
      password:"30683643",
    };
  }


  // BACK+FRONT
  onSubmit() {
    this.fnLogin();
  }
  // onSubmit() {
  //   this.http
  //     .post('https://tmdb-for-a-angularmovile.onrender.com/login', {
  //       user_info: this.user_info,
  //       password: this.password,
  //       bios: this.bios,
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         this.location.back();
  //       },
  //       error: (error) => {
  //         const alert = this.alertController
  //           .create({
  //             header: 'ERROR',
  //             message: error.error.msg,
  //             buttons: ['Dismiss'],
  //           })
  //           .then((alert) => {
  //             alert.present();
  //           });
  //       },
  //     });
  // }


  getData() {
    // console.log(this.localURL);
    // this.http.get(`${this.localURL}/auth/a`)
    return this.http.get(`http://localhost:7338/auth/a`).subscribe((res: any) => {
      
      console.log(res);
    }); // Utiliza la URL para hacer la petición
  }

   fnLogin(){
  this.http.post(`${this.localURL}/auth/signin`, this.existingUser).subscribe(async (res: any) => {
    
    await this.storeToken(res.token);
      this.navigation.navigateForward('/home');
      // console.log();
    });

    // /*return */this.http.post(`${this.localURL}/auth/signin`, this.existingUser).subscribe(
    //   async (response: any) => {
    //     if (response && response.token) {
    //       console.log(response.token);
          
    //       await this.storeToken(response.token);

    //       console.log();
          
    //     }
    //   },
    //   (error) => {
    //     console.error('Error al iniciar sesión:', error);
    //   }
    // );

    // this.navigation.navigateForward('/home/map');
  }
  async getToken() {
    
    const token = await Preferences.get({ key: this.TOKEN });    
    if (token.value) {
      await this.navigation.navigateForward('/home/map');
      console.log(token.value);
    }
    console.log('putoo');
    
  }
  // async getToken(): Promise<string | null> {
    //   const { value } = await Preferences.get({ key: this.TOKEN_KEY });
    //   return value;
    // }
    // async Login() {
      //   if (this.existingUser.user_info == '' || this.existingUser.password == '') {
        //     this.alert
        //       .create({
          //         header: 'Error',
          //         message: 'Please fill all the fields',
          //         buttons: ['OK'],
          //       })
          //       .then((alert) => alert.present());
  //     return;
  //   }

// }

private async storeToken(token: string) {
  await Preferences.set({
    key: this.TOKEN,
    value: token,
  });
  this.navigation.navigateForward('/home');
}

async setToken(token: string) {
  await Preferences.set({
    key: 'token',
    value: token,
  });
  this.navigation.navigateForward('/home');
}

async logout() {
  // this.http.get
  await Preferences.remove({ key: this.TOKEN });
}


// async isLoggedIn(): Promise<boolean> {
//   const token = await this.getToken();
//   return !!token;
// }
}