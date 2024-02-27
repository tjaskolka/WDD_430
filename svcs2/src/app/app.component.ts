import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription;

  constructor (private userService: UserService) {}

  ngOnInit(): void {
    this.activatedSub = this.userService.activatedEmitter.subscribe( didActivate => {
      this.userActivated = didActivate;
    });
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }

}
