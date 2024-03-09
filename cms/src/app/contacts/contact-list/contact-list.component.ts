import { Component, OnInit, OnDestroy } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service'
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private contactSubscription: Subscription;
  private term: string;
  
  constructor(private contactService: ContactService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactSubscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.contactSubscription.unsubscribe();
  }
}
