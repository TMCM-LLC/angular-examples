import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loggedIn: boolean;
  items: number[] = [];
  itemObservable: Observable<number>;
  itemSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((result) => {
      this.loggedIn = result;
    });

    this.itemObservable = new Observable<number>(obs => {
      let count = 1;
      const interval = setInterval(() => {
        obs.next(count);
        console.log(count);
        if (count === 7) {
          window.clearInterval(interval);
          obs.complete();
        }
        count++;
      }, 1000);
    });
  }

  logIn(duration?: number): void {
    this.authService.login(duration);
  }

  logOut(): void {
    this.authService.logout();
  }

  countItems(): void {
    this.items = [];
    this.stopCountItems();

    this.itemSubscription = this.itemObservable.subscribe((item) => {
      this.items.push(item);
    }, () => {
        console.log('Error');
      },
      () => {
        console.log('Complete');
      });
  }

  stopCountItems(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
  }
}
