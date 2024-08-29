import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { UpdateemailComponent } from '../../../components/modals/updateemail/updateemail.component';
import { UpdatepasswordComponent } from '../../../components/modals/updatepassword/updatepassword.component';
import { UpdatenameComponent } from 'src/app/components/modals/updatename/updatename.component';
import { DeleteaccountComponent } from 'src/app/components/modals/deleteaccount/deleteaccount.component';
import { environment } from '../../../../environments/environment';
import { ProfilepictureComponent } from 'src/app/components/modals/profilepicture/profilepicture.component';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  token = environment.token;
  fullname: string | null = null;
  username: string | null = null;
  userid: any = '';
  userRole: string | null = null;
  profilePictureUrl: string = '/assets/icon/profilepic.png';


  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private authInterceptor: AuthInterceptor
  ) { }


  changePicture(){
    console.log('hola mundo');
    this.modalController
    .create({
      component: ProfilepictureComponent ,
      cssClass: 'my-custom-class',
    })
    .then((modal) => {
      modal.present();
    });
  }



  changeEmail() {
    this.modalController
      .create({
        component: UpdateemailComponent,
        cssClass: 'my-custom-class',
      })
      .then((modal) => {
        modal.present();
      });
  }

  changePassword() {
    this.modalController
      .create({
        component: UpdatepasswordComponent,
        cssClass: 'my-custom-class',
      })
      .then((modal) => {
        modal.present();
      });
  }

  changeName() {
    this.modalController
      .create({
        component: UpdatenameComponent,
        cssClass: 'my-custom-class',
      })
      .then((modal) => {
        modal.present();
      });
  }

  deleteAccount() {
    this.modalController
      .create({
        component: DeleteaccountComponent,
        cssClass: 'my-custom-class',
      })
      .then((modal) => {
        modal.present();
      });
  }

  async logout() {
    const a = await Preferences.get({key: this.token});    
    await Preferences.remove({ key: this.token });    
    await Preferences.clear();

    this.router.navigate(['/login']); // ajustar para que salga en / limpio
  }
  async createVehicle(){
    console.log('holamundo');
    
  }
  async ngOnInit() {
    this.fullname = await this.authInterceptor.getFullname();
    this.username = await this.authInterceptor.getUsername();
    this.userid = await this.authInterceptor.getUserID();
    this.userRole = await this.authInterceptor.getRole();
    this.authInterceptor.getProfilePicture(this.userid).subscribe(
      (url: string) => {
        this.profilePictureUrl = url;
      },
      (error) => {
        console.error('Error al cargar la imagen de perfil', error);
      }
    );
  }
}
