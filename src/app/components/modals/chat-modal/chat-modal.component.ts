// src/app/groups/chat-modal/chat-modal.component.ts

import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})
export class ChatModalComponent implements OnInit, AfterViewChecked {
  @Input() user!: any;
  @Input() participants!: string[];
  @Input() roomId!: string;
  @ViewChild('chatScroll') chatScroll!: ElementRef;

  message: string = '';
  messages: any[] = [];
  public chatName: string = '';
  // public user 
  private socket: any;
  private localURL = environment.localURL;
  public userInfo: any;
  public users: any = [];



  constructor(
    public modalController: ModalController,
    private http: HttpClient,
    private router: Router
  ) {
    this.socket = io(`${this.localURL}`, {
      autoConnect: false, 
    });
    this.socket.on('messageFromAnother' , (data:any)=>{
      console.log(data);
      this.messages.push(data);
      console.log(this.messages);
    })
  }


  async getChatMessages(idRoom: string, participants: string[]) {
    const data = { idRoom, participants };
    console.log(data);
    try {
      return new Promise((resolve, reject) => {
        this.http
          .post(`${this.localURL}/chat/getChatMessages/${idRoom}`, {
            participants,
          })
          .subscribe(
            (data: any) => {
              console.log(data);
              resolve(data);
            },
            (error) => {
              reject(error);
            }
          );
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getMessages() {
    try {
     
    } catch (error) {
      this.closeModal();
      console.log(error)
    }
  }

  sendMessage() {
    console.log('hola');
    
  }
  
  public async getUserInfo() : Promise<void>{
    await this.http.post(`${this.localURL}/auth/finduser` , {_id:this.user}).subscribe(async (res:any)=>{
      console.log(res);
      this.userInfo = res;
    });
    
  }
  closeModal() {
    console.log("adios")
    this.socket.emit('leaveRoom', {
      roomId: this.roomId,
    });
    this.socket.disconnect();
    this.modalController.dismiss();
  }

  

  async ngOnInit() {
    await this.getUserInfo();
    console.log(this.localURL)
    console.log(`connecting to the chat: ${this.roomId} with the user: ${this.user}`);
    this.socket.connect();
    this.socket.emit('joinRoom', {
      roomId: this.roomId,
      user: this.userInfo
    });
    try {
      const getChatMessagesTest:any = await this.getChatMessages(this.roomId , this.userInfo);
      const messages:any =  getChatMessagesTest.getChatMessages;
      this.messages = messages;
    } catch (error) {
      console.log(error);
    }

  }

  ngAfterViewChecked() {
    this.chatScroll.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}