import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.documents = this.documentsService.getDocuments();
  }
    
}
