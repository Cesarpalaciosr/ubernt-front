import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { UpdateemailComponent } from '../../../components/updateemail/updateemail.component';
import { UpdatepasswordComponent } from '../../../components/updatepassword/updatepassword.component';
import { UpdatenameComponent } from '../../../components/updatename/updatename.component';
import { DeleteaccountComponent } from '../../../components/deleteaccount/deleteaccount.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  token = environment.token;
  alias: string = '';

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

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
    // await Preferences.remove({ key: 'alias' });
    const a = await Preferences.get({key: this.token});

    console.log(a.value);
    
    
    await Preferences.remove({ key: this.token });
    const b = await Preferences.get({key: this.token});
    console.log(b.value);
    
    await Preferences.clear();

    this.router.navigate(['/login']); // ajustar para que salga en / limpio
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.alias = value!;
  }
}
