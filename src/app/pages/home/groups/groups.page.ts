import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatModalComponent } from 'src/app/components/modals/chat-modal/chat-modal.component';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../../../environments/environment';
  

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss'],
})
export class GroupsPage implements OnInit {
  user: string = '';
  users: any = [];
  groups: any = [];
  private localURL = environment.localURL;
   

  constructor(
    private http: HttpClient,
    private router: Router,
    public modalController: ModalController
  ) {}

  searchUser(event: any) {
    this.users = [];
    // if (event.target.value !== '') {
    //   this.http
    //     .post('https://tmdb-for-a-angularmovile.onrender.com/search', {
    //       query: `${event.target.value}`,
    //     })
    //     .subscribe((data: any) => {
    //       data.forEach((user: any) => {
    //         if (user.alias !== this.user) {
    //           this.users.push(user);
    //         }
    //       });
    //     });
    // }
    console.log(this.users);
  }

  public async openChat(user: any) {
  
    // this.http
    //   .post('https://tmdb-for-a-angularmovile.onrender.com/chat', {
    //     roomId: this.user + user.alias,
    //     participants: [this.user, user.alias],
    //   })
    //   .subscribe((data: any) => {
    //     // console.log(data);
        
    //   });
    // modal.then(modal => modal.present());
  }

  public async openGroup(group: any ) {
    await Preferences.set({key:"groupToSee" , value:group});
      console.log("user to chat:" +  group)
      const modal = this.modalController
          .create({
            component: ChatModalComponent,
            componentProps: {
              user: this.user,
              participants: [],
              roomId: group,
            },
          })
          .then((modal) => {
            modal.present();
            console.log("gruop saved" , group)
          });
  
  }


  private async loadGroups(): Promise<void> {
    await this.http
        .get(`${this.localURL}/chat/getGroupChats`, {})
        .subscribe((data: any) => {
          console.log(data)
          this.groups = data.groups
          console.log(this.groups)
        });
  }
  async ngOnInit() { //cambiar o poner un refresher para que actualize los grupos cuando se vuelva a entrar a la app
    const data = await Preferences.get({ key: 'id' });
    this.user = data.value!;
    await this.loadGroups();
  }
}
