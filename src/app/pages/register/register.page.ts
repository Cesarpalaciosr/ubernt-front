import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { newUser, ErrorInterface } from 'src/app/interfaces/index';
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
  public isLoading: boolean = false;

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
  public onSubmit() {
    this.isLoading = true;
    console.log(this.newUser);
    try{
      this.http.post(`${this.URL}/auth/signup`, this.newUser).subscribe(async (res:any)=>{
        this.alertController
        .create({
          header: 'Success',
          message: 'User created successfully, pls check your email',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
        this.isLoading = false;
        this.navigation.navigateForward('/login');
      },
      (error: any) => {
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
      this.isLoading = false;
      }
      )
    } catch(error){
      console.log("errores : " , error)
    }
  
  }
  async getToken() {
    const token = await Preferences.get({ key: this.TOKEN });
    if (token.value) {
      this.navigation.navigateForward('/home');
    }
  }

  public showPassword(buttonId:string, inputId:string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const button = document.getElementById(buttonId) as HTMLInputElement;
    if (input.type == 'password') {
      input.type = 'text';
      button.name = 'eye-off';
    } else {
      input.type = 'password';
      button.name = 'eye';
    }
  }
}
