import { EventEmitter, Injectable } from '@angular/core';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documents: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  newId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();

   }

   documentSelectedEvent = new EventEmitter<Document>();

   getDocuments(): Document[] {
    return this.documents.slice();
   }

   getDocument(id:string): Document {
    return this.documents.find((d) => d.id === id);
   }

   addDocument(newDocument: Document) {
    if (newDocument === null || undefined) {
      return;
    }
    this.newId = this.maxDocumentId++;
    newDocument.id = this.newId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());

   }

updateDocument(origDocument: Document, newDocument: Document) {
  if (((origDocument || newDocument) === undefined) || ((origDocument || newDocument) === null)) {
    return;
  }
  const pos = this.documents.indexOf(origDocument);
  if ( pos < 0 ) {
    return;
  }
  newDocument.id = origDocument.id;
  this.documents[pos] = newDocument;
  this.documentListChangedEvent.next(this.documents.slice());

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
    this.documentListChangedEvent.next(this.documents.slice());
   }

   getMaxId():number {
    let maxId = 0;

    for (let d of this.documents) {
      if(+d.id > maxId) {
        maxId = +d.id;
      }
    }
  return maxId;  
  }
}
