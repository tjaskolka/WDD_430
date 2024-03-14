import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';
//import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  maxContactId: number;
  newId: number;

  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
//    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  
  getContacts() {
    return this.http
      .get<Contact[]>(
        'https://wdd430-b3deb-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe((contacts) => {
        this.contacts = contacts;
        this.setContacts(contacts);
      });
  }

  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContact(id: string): Contact {
    return this.contacts.find((c) => c.id === id);
  }

  storeContacts() {
    const conToString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


    this.http.put('https://wdd430-b3deb-default-rtdb.firebaseio.com/contacts.json', conToString, { headers })
    .subscribe({
        next: (response) => {
            this.contactListChangedEvent.next(this.contacts.slice());
            console.log(response);
            console.log("contact store was successful");
        },
        error: (error) => {
            console.log(error);
        }
    });
  }

  addContact(newContact: Contact) {
    if (newContact === null || undefined) {
      return;
    }
    this.newId = this.getMaxId();
    this.newId = this.newId + 1;
    console.log(this.newId);
    newContact.id = this.newId.toString();
    this.contacts.push(newContact);
 //   this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  updateContact(origContact: Contact, newContact: Contact) {
    if (
      (origContact || newContact) === undefined ||
      (origContact || newContact) === null
    ) {
      return;
    }
    const pos = this.contacts.indexOf(origContact);
    if (pos < 0) {
      return;
    }
    newContact.id = origContact.id;
    this.contacts[pos] = newContact;
//    this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const ind = this.contacts.indexOf(contact);
    if (ind < 0) {
      return;
    }
    this.contacts.splice(ind, 1);
 //   this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let c of this.contacts) {
      if (+c.id > maxId) {
        maxId = +c.id;
      }
    }
    return maxId;
  }
}
