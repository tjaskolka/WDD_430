import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private documents: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  newId: number;
  error = new Subject<string>();

  constructor(private http: HttpClient) {
//   this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  documentSelectedEvent = new EventEmitter<Document>();

  getDocuments() {
    return this.http
      .get<Document[]>(
        'https://wdd430-b3deb-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe((documents) => {
        this.documents = documents;
        this.setDocuments(documents);
 //      this.documentListChangedEvent.next(this.documents.slice());
      }
      // error => {
      //   console.log(error.message);
      // }
      );   
  }

  storeDocuments() {
    const docToString = JSON.stringify(this.getDocuments());
    console.log(docToString);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

//    console.log(docToString);
    this.http.put('https://wdd430-b3deb-default-rtdb.firebaseio.com/documents.json',
    docToString, { headers }
    // {
    //   observe: 'response'
    // }
    )
    .subscribe(
      (response) => {
        console.log(response);
      },
      // (error) => {
      //   this.error.next(error.message);
      // }
    );
  }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.documentListChangedEvent.next(this.documents.slice());
  }
  
  getDocument(id: string): Document {
    return this.documents.find((d) => d.id === id);
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || undefined) {
      return;
    }
    this.newId = this.maxDocumentId + 1;
    newDocument.id = this.newId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(origDocument: Document, newDocument: Document) {
    if (
      (origDocument || newDocument) === undefined ||
      (origDocument || newDocument) === null
    ) {
      return;
    }
    const pos = this.documents.indexOf(origDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = origDocument.id;
    this.documents[pos] = newDocument;
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let d of this.documents) {
      if (+d.id > maxId) {
        maxId = +d.id;
      }
    }
    return maxId;
  }
}
