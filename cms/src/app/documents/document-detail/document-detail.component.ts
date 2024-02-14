import { Component, OnInit } from '@angular/core';

import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(
    private documentsService: DocumentsService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ) {
    this.nativeWindow = windRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document = this.documentsService.getDocument(this.id);
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
