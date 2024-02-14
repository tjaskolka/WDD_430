import { EventEmitter, Injectable } from '@angular/core';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();

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

   deleteDocument(document: Document) {
    if(!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0){
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
   }
}
