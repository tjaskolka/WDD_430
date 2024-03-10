import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})

export class MessageListComponent implements OnInit {
    messages: Message[] = [];

    constructor(private messagesService: MessagesService) {}

    ngOnInit(): void {
      this.messagesService.getMessages();
      this.messagesService.messageChangedEvent.subscribe(
        (messages: Message[]) => {
          this.messages = this.messages;
        }
      )
    }
  
    onAddMessage(message: Message) {
      this.messages.push(message);
    }
}
