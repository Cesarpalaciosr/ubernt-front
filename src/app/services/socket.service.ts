import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';


interface ChatInterface {
    idRoom: string;
    messages: string[];
    participants: string[];
    type: string;
}

interface MessageInterface {
    idRoom: string;
    idSender: string;
    idSentTo?: string;
    message: string;
    sendTo?: string;
    sender: string;
}

@Injectable()
export class ChatService {
    private socket: any;
    private messages = new ReplaySubject<MessageInterface[]>(1);
    private localURL = environment.localURL;
    constructor(private http: HttpClient) { }

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

    async saveChatMessages(messages: MessageInterface) {
        console.log(messages);
        const { idRoom } = messages;
        try {
            return new Promise((resolve, reject) => {
                this.http
                    .post(`${this.localURL}/chat/saveChatMessages/${idRoom}`, messages)
                    .subscribe(
                        (data: any) => {
                            console.log(data);
                            resolve(data);
                        },
                        (error) => {
                            console.log(error);
                            reject(error);
                        }
                    );
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

@Injectable({
    providedIn: 'root'
  })
  export class TripService {
    private socket: any;
    private URL = environment.localURL;
  
    constructor() {
      this.socket = io(`${this.URL}`); // Reemplaza con tu URL de servidor
    }
  
    // Emitir eventos
    emit(event: string, data: any) {
      this.socket.emit(event, data);
    }
  
    // Escuchar eventos
    on(event: string, callback: Function) {
      this.socket.on(event, callback);
    }
  
    // Desconectar el socket
    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
  }
