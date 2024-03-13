import { Component } from '@angular/core';

import { DocumentsService } from './documents/documents.service';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private documentsService: DocumentsService) {}

  onSaveData() {
    this.documentsService.storeDocuments();
  }

}