import { Component, OnInit } from '@angular/core';

import { Document } from '../document.model';
import { ActivatedRoute, Params } from '@angular/router';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;

  constructor(private documentsService: DocumentsService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
    (params: Params) => {
      this.id = params['id'];
      this.document = this.documentsService.getDocument(this.id);

    }
    )
  }
}
