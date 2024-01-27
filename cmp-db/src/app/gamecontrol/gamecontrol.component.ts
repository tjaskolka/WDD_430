import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gamecontrol',
  templateUrl: './gamecontrol.component.html',
  styleUrl: './gamecontrol.component.css'
})
export class GamecontrolComponent {
  @Output() intervalBegun = new EventEmitter<number>();
  interval;
  postNumber = 0;

  ngOnInit() {

  }

  onStartGame() {
    this.interval = setInterval(() => {
      this.intervalBegun.emit(this.postNumber +1 );
      this.postNumber++;
    }, 1000);
  }

  onStopGame() {
    clearInterval(this.interval);
  }


}
