import { Component, OnInit } from '@angular/core';

import { Document } from './document.model';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {
selectedDocument: Document;

  constructor (private documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.documentsService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }
}
