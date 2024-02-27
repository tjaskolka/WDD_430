import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observer, Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit, OnDestroy {
  private firstObsSub: Subscription;
  
 ngOnInit(): void {
  //   this.firstObsSub = interval(1000).subscribe(value => {
  //     console.log(value);
  //   });
  const customObservable = new Observable((observer: Observer<number>) => {
    let count = 0;
    setInterval(() => {
      observer.next(count);
      if (count === 2) {
        observer.complete();
      }
      if (count > 3) {
        observer.error(new Error('Count is greater than 3!'));
      }
      count++;
    }, 1000);
  });

  this.firstObsSub = customObservable.pipe(filter(data => {
    return data > 0;
  }), map((data: number) => {
    return 'Round: ' + (data + 1);
  })).subscribe(count => {
    console.log(count);
  }, error => {
    console.log(error);
    alert(error.message);
  }, () => {
    console.log('Completed!');
  }
  );
 } 

  ngOnDestroy(): void {
    this.firstObsSub.unsubscribe();
  }

}

function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

