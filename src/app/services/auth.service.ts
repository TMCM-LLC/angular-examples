import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject(false);
  isLoggedIn = this.loggedIn.asObservable();

  constructor() { }

  login(duration?: number): void {
    this.loggedIn.next(true);

    if (duration) {
      setTimeout(() => this.loggedIn.next(false), duration);
    }
  }

  logout(): void {
    this.loggedIn.next(false);
  }
}
