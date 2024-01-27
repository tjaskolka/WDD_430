import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styles: [
  ]
})
export class ServerElementComponent implements OnInit {
  @Input() element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}
