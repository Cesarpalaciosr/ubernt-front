import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { ChatService } from 'src/app/services/socket.service';
import { ChatInterface, MessageInterface } from 'src/app/interfaces/chat.interface';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})

export class ChatModalComponent implements OnInit, OnDestroy {
  @Input() top: any;
  @Input() user!: any;
  @Input() participants!: string[];
  @Input() roomId!: string;
  @ViewChild('chatScroll') chatScroll!: ElementRef;

  message: string = '';
  messages: any[] = [];
  public chatName: string = '';
  private socket: any;
  private localURL = environment.localURL;
  // public userInfo: any;
  public userInfo: {
    _id: string;
    username: string;
    fullName: string;
  } = {
      _id: '',
      username: '',
      fullName: '',
    }
  public users: any = [];

  constructor(
    public modalController: ModalController,
    private http: HttpClient,
    private router: Router,
    private chatService: ChatService
  ) {
    this.socket = io(`${this.localURL}`, {
      autoConnect: false,
    });
    this.socket.on('messageFromAnother', (data: any) => {
      console.log(data);
      this.messages.push(data);
      console.log(this.messages);
    });
  }


  public async getMessages() {
    try {
      this.socket.emit('getMessages', {
        roomId: this.roomId,
        user: this.user,
      });
      this.socket.on('message', (data: any) => {
        console.log(data);
      });
    } catch (error) {
      this.closeModal();
      console.log(error);
    }
  }

  public async sendMessage() {
    if (this.message === '') {
      return;
    }
    const message = {
      message: this.message,
      idRoom: this.user,
    };

    const messageToSave: any = {
      message: this.message,
      sender: this.userInfo.username,
      idSender: this.userInfo._id,
      sendTo: this.roomId,
      idRoom: this.roomId,
      idSentTo: this.roomId,
    };

    // this.socket.emit('chatMessage', {
    //   message: this.message,
    //   sender: this.user.username,
    //   idSender: this.user._id,
    //   idRoom: this.roomId,
    // });
    this.socket.emit('chatMessage', messageToSave);

    try {
      this.chatService.saveChatMessages(messageToSave);
      this.message = '';
      // this.messages.push(messageToSave);
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserInfo(): Promise<void> {
    const username: any = await Preferences.get({ key: 'username' });
    const fullName: any = await Preferences.get({ key: 'fullname' });
    const _id: any = await Preferences.get({ key: 'id' });
    this.userInfo = {
      _id: _id.value,
      username: username.value,
      fullName: fullName.value,
    };
  }

  public closeModal() {
    console.log("adios");
    this.socket.emit('leaveRoom', {
      roomId: this.roomId,
    });
    this.socket.disconnect();
    this.modalController.dismiss();
  }

  public async ngOnInit() {
    await this.getUserInfo();
    //console.log(`connecting to the chat: ${this.roomId} with the user: ${this.user}`);
    await this.socket.connect();
    await this.socket.emit('joinRoom', {
      roomId: this.roomId,
      user: this.userInfo
    });
    try {
      const ChatMessages: any = await this.chatService.getChatMessages(this.roomId, [this.userInfo._id]);
      const messages: MessageInterface[] = ChatMessages.chatMessages;
      if (messages.length > 0) {
        this.messages = messages;
      }

    } catch (error) {
      console.log(error);
    }
  }

  // public ngAfterViewChecked() {
  //   // this.chatScroll.nativeElement.scrollIntoView({
  //   //   behavior: 'smooth',
  //   // });
  // }

  public ngOnDestroy() {
    this.closeModal();
  }
}