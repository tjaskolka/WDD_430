import { Component, EventEmitter, Output } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document("1", "doc1", "first document", "#1"),
    new Document("2", "doc2", "second document", "#2"),
    new Document("3", "doc3", "third document", "#3"),
    new Document("4", "doc4", "fourth document", "#4"),
    new Document("5", "doc5", "fifth document", "#5")
  ]

  
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
  
}
