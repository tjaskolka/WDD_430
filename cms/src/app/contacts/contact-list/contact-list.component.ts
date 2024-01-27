import { Component, EventEmitter, Output } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu","208-496-3771", "../../assets/images/jacksonk.jpg", null),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", null),
    new Contact("3", "Terri Jaskolka", "tjaskolka@gmail.com", "123-345-5678", "../../assets/images/barzeer.jpg", null)
  ];

  constructor() {}

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
