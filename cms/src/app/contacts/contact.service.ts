
import { EventEmitter, Injectable } from "@angular/core";
import { Contact } from "./contact.model";
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private contacts: Contact[] = [];
    maxContactId: number;
    newId: number;

   // contactChangedEvent = new EventEmitter<Contact[]>();
    contactSelectedEvent = new EventEmitter<Contact>();
    contactListChangedEvent = new Subject<Contact[]>();

    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id:string): Contact {
        return this.contacts.find((c) => c.id === id);
    }

    addContact(newContact: Contact) {
        if (newContact === null || undefined) {
            return;
        }
        this.newId = this.maxContactId++;
        newContact.id = this.newId.toString();
        this.contacts.push(newContact);
        this.contactListChangedEvent.next(this.contacts.slice());
    }

    updateContact(origContact: Contact, newContact: Contact) {
        if (((origContact || newContact) === undefined) || (origContact || newContact) === null) {
            return;
        }
        const pos = this.contacts.indexOf(origContact);
        if ( pos < 0) {
            return;
        }
        newContact.id = origContact.id;
        this.contacts[pos] = newContact;
        this.contactListChangedEvent.next(this.contacts.slice());
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
        this.contactListChangedEvent.next(this.contacts.slice());
    }

    getMaxId(): number {
        let maxId = 0;

        for ( let c of this.contacts) {
            if (+c.id > maxId) {
                maxId = +c.id;
            }
        }
        return maxId;
    }
}