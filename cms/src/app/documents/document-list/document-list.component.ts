import { Component, OnInit } from '@angular/core';

import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentsService: DocumentsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.documents = this.documentsService.getDocuments();
    this.documentsService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }
    
}
