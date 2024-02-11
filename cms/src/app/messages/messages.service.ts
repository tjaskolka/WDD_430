import { EventEmitter, Injectable } from '@angular/core';

import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: Message[] = [];

  messageChangedEvent = new EventEmitter<Message[]>();

    constructor() {
    this.messages = MOCKMESSAGES;
   }

  getMessages(): Message[] {
    return this.messages;
  }

  getMessage(id:string): Message {
    return this.messages.find((m) => m.id === id);
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
