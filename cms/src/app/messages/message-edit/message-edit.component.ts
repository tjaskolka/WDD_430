import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})

export class MessageEditComponent {
//  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  currentSender: string = '1';

  constructor (private messagesService: MessagesService) {}
  

  onSendMessage(){
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const message = new Message('1', subject, msgText, this.currentSender);
    this.messagesService.addMessage(message);
    console.log(message);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
