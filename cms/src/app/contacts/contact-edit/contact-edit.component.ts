import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  contactForm: FormGroup;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {}

  get controls() {
    return (<FormArray>this.contactForm.get('groupContacts')).controls;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (this.originalContact === undefined || this.originalContact === null) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact (null, value.name, value.email, value.phone, value.imageUrl, value.group);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.editMode = false;
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    if(event.previousContainer !== event.container) {
      const contactCopy = {...event.item.data};
      this.groupContacts.push(contactCopy);
    }
  }

  isInvalidContact(newContact: Contact) {
    if(!newContact) {
      return true;
    }
    if(this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i=0; i<this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  onRemoveItem(index: number) {
    if(index<0 || index >= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(index, 1);
  }

}