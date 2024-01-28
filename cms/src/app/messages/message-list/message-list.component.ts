import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})

export class MessageListComponent {
    messages: Message[] = [
      new Message('1', 'Ready', 'I can meet with you any time now', 'John R'),
      new Message('2', 'Running late', 'I will be there in an hour', 'Stacy'),
      new Message('3', 'Need help', 'Can we talk about this later?', 'Nan')
    ];
  
    onAddMessage(message: Message) {
      this.messages.push(message);
    }
}
