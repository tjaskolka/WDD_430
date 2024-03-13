import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentsService } from './documents/documents.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private documentsService: DocumentsService) {}
  documentUrl = "https://wdd430-b3deb-default-rtdb.firebaseio.com/documents.json";
  contactUrl = "https://wdd430-b3deb-default-rtdb.firebaseio.com/contacts.json";
  messageUrl = "https://wdd430-b3deb-default-rtdb.firebaseio.com/messages.json";

  fetchDocuments() {
    return this.http.get<Document[]>(this.documentUrl)
    .pipe(map(documents => {
      return documents.map(document => {
        return{...document};
      });
    }))
  }
}
