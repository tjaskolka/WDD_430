
import { EventEmitter, Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private contacts: Contact[] = [];
    contactChangedEvent = new EventEmitter<Contact[]>();

    contactSelectedEvent = new EventEmitter<Contact>();

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id:string): Contact {
        return this.contacts.find((c) => c.id === id);
    }

    deleteContact(contact: Contact) {
        if(!contact) {
            return;
        }
        const ind = this.contacts.indexOf(contact);
        if(ind < 0 ) {
            return;
        }
        this.contacts.splice(ind,1);
        this.contactChangedEvent.emit(this.contacts.slice());
    }
}