import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})

export class MessageListComponent implements OnInit {
    messages: Message[] = [];
    private messageSubscription: Subscription;

    constructor(private messagesService: MessagesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.messagesService.getMessages();
      this.messageSubscription = this.messagesService.messageListChangedEvent.subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
    }
  
    onAddMessage(message: Message) {
      this.messages.push(message);
    }
}
