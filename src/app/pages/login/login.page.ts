import { Component, OnInit } from '@angular/core';
import { existingUser , ErrorInterface } from 'src/app/interfaces/index';
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
  
  
  async ngOnInit() {
    await this.getToken();
  }

  // BACK+FRONT
  public onSubmit() {
    this.fnLogin();
  }
  
  public fnLogin(){
        this.http.post(`${this.localURL}/auth/signin`, this.existingUser).subscribe(async (res: any) => {
          console.log(res)
          await this.storeToken(res.token)
          this.alertController
          .create({
            header: 'Success',
            message: 'Login succesfull',
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
          this.navigation.navigateForward('/home');
        }, (error) => {
          console.log(error);
          const errorsMessages = error.error.errors;
          const newErrors: Array<String> = [];
          console.log(errorsMessages);
          errorsMessages.forEach((element: ErrorInterface) => {
            newErrors.push(element.msg);
          });
          console.log(newErrors);
          this.alertController
            .create({
              header: 'you have the following errors',
              message: newErrors.join(', '),
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });
            })
  };

  public async getToken() {
    const token = await Preferences.get({ key: this.TOKEN });
    if (token.value) {
      this.navigation.navigateForward('/home');
    }
  }

  private async storeToken(token: string) {
    await Preferences.set({
      key: this.TOKEN,
      value: token,
    });
    this.navigation.navigateForward('/home');
  }

}