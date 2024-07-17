// src/app/groups/chat-modal/chat-modal.component.ts

import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})
export class ChatModalComponent implements OnInit, AfterViewChecked {
  @Input() user!: string;
  @Input() participants!: string[];
  @Input() roomId!: string;
  @ViewChild('chatScroll') chatScroll!: ElementRef;

  message: string = '';
  messages: any[] = [];
  private socket: any;

  constructor(
    public modalController: ModalController,
    private http: HttpClient,
    private router: Router
  ) {
    this.socket = io('https://tmdb-for-a-angularmovile.onrender.com', {
      autoConnect: false,
    });
  }

  sendMessage() {
    const msg = {
      message: this.message,
      sender: this.user,
    };

    this.http
      .post('https://tmdb-for-a-angularmovile.onrender.com/chat/message', {
        message: msg,
        roomId: this.roomId,
      })
      .subscribe(() => {
        this.socket.emit('message', {
          message: msg.message,
          sender: msg.sender,
          roomId: this.roomId,
        });
        this.message = '';
      });

    this.chatScroll.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }

  closeModal() {
    this.socket.emit('leaveRoom', {
      roomId: this.roomId,
    });
    this.socket.disconnect();
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.socket.connect();
    this.socket.emit('joinRoom', {
      roomId: this.roomId,
    });

    this.http
      .get(
        'https://tmdb-for-a-angularmovile.onrender.com/chat/messages/' +
          this.roomId
      )
      .subscribe((data: any) => {
        this.messages = data.messages;
      });

    this.socket.on('message', (data: any) => {
      this.messages.push(data);
    });
  }

  ngAfterViewChecked() {
    this.chatScroll.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}