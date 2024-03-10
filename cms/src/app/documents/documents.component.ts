import { Component, OnInit } from '@angular/core';

import { Document } from './document.model';
import { DocumentsService } from './documents.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];

  constructor (private documentsService: DocumentsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.documentsService.getDocuments();
    this.documentsService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }
}
