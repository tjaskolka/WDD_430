import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: Message[] = [];

  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();

    constructor(private http: HttpClient) {
 //   this.messages = MOCKMESSAGES;
   }

  getMessages() {
    return this.http
    .get<Message[]>(
      'https://wdd430-b3deb-default-rtdb.firebaseio.com/messages.json'
    )
    .subscribe((messages) => {
      this.messages = messages;
      console.log(this.messages);
      this.messageListChangedEvent.next(this.messages.slice());
    }
    // , error => {
    //   console.log(error.message);
    // }
    );
  }

  getMessage(id:string): Message {
    return this.messages.find((m) => m.id === id);
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
