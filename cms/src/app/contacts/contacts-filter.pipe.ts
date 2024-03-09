import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string) {
    let contactArray: Contact[] = [];
    if (contactArray.length === 0) {
      return contacts;
    }

    if (term && term.length > 0) {
      contactArray = contacts.filter(
        (contact:Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    return contactArray;
  }

}
