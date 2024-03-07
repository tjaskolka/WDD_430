import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent  implements OnInit {
  originalDocument: Document;
  document: Document;
  subscription: Subscription;
  editMode: boolean = false;

    constructor(private documentsService: DocumentsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentsService.getDocument(id);
      if (this.originalDocument === undefined || this.originalDocument === null) {
        return
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));


    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(null, value.name, value.description, value.url);
    if (this.editMode) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentsService.addDocument(newDocument);
    }
    this.editMode = false;
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['documents']);
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}