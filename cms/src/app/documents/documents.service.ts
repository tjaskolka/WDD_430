import { EventEmitter, Injectable } from '@angular/core';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   documentSelectedEvent = new EventEmitter<Document>();

   getDocuments(): Document[] {
    return this.documents.slice();
   }

   getDocument(id:string): Document {
    return this.documents.find((d) => d.id === id);
   }
}
