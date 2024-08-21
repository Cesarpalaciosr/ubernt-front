import { Component, OnInit } from '@angular/core';
import { existingUser } from '../../interfaces/user.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
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
    private http: HttpClient,
    private alertController: AlertController,
    private navigation: NavController,
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
  
  fnLogin(){
        this.http.post(`${this.localURL}/auth/signin`, this.existingUser).subscribe(async (res: any) => {
          if (res && res.token) {
            await this.storeToken(res.token);
            this.navigation.navigateForward('/home')
          }
        }, (error) => {
              console.error('Error al iniciar sesión:', error);
            })
  };

  async getToken() {
    const token = await Preferences.get({ key: this.TOKEN });
    if (token.value) {
      this.navigation.navigateForward('/home');
    }
  }

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

}