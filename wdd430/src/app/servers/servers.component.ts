import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css'
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No Server was created!';
  serverName = 'Testserver';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];
  username = '';
  toggleDisplay = false;
  log: number[] = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit () {

  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was created. The name is ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    this.serverName = event.target.value;
  }

  onToggleDisplay() {
    this.toggleDisplay = !this.toggleDisplay;
    this.log.push(this.log.length +1);
  }
}
