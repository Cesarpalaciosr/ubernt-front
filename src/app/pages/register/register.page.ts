import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { newUser, ErrorInterface } from 'src/app/interfaces/index';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public TOKEN: string = environment.token;
  public URL: string = environment.localURL;
  public isLoading: boolean = false;

  newUser: newUser = {
    fullName: '',
    ci: '',
    username: '',
    email: '',
    password: '',
    career: '',
    repeat_password: '',
    phoneNumber: '',
  };

  expandedField: keyof newUser | null = null; // Solo un campo puede estar expandido a la vez

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private location: Location,
    private navigation: NavController
  ) {}

  ngOnInit() {
    this.getToken();
  }

  // Alternar la expansión del campo seleccionado y minimizar el resto
  toggleExpand(field: keyof newUser) {
    // Si el campo que se ha hecho clic ya está expandido, lo minimizamos
    this.expandedField = this.expandedField === field ? null : field;
  }

  // Método de envío del formulario (back y front)
  public onSubmit() {
    this.isLoading = true;
    try {
      this.http.post(`${this.URL}/auth/signup`, this.newUser).subscribe(
        async (res: any) => {
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'User created successfully, please check your email',
            buttons: ['OK'],
          });
          await alert.present();
          this.isLoading = false;
          this.navigation.navigateForward('/login');
        },
        (error: any) => {
          const errorsMessages = error.error.errors;
          const newErrors: string[] = [];
          errorsMessages.forEach((element: ErrorInterface) => {
            newErrors.push(element.msg);
          });
          this.alertController
            .create({
              header: 'You have the following errors',
              message: newErrors.join(', '),
              buttons: ['OK'],
            })
            .then((alert) => alert.present());
          this.isLoading = false;
        }
      );
    } catch (error) {
      console.log('Errors: ', error);
    }
  }

  // Obtener el token almacenado
  async getToken() {
    const token = await Preferences.get({ key: this.TOKEN });
    if (token.value) {
      this.navigation.navigateForward('/home/map');
    }
  }

  // Mostrar u ocultar contraseña
  public showPassword(buttonId: string, inputId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const button = document.getElementById(buttonId) as HTMLInputElement;
    if (input.type === 'password') {
      input.type = 'text';
      button.name = 'eye-off';
    } else {
      input.type = 'password';
      button.name = 'eye';
    }
  }
}
