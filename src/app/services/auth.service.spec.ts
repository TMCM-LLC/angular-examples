import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AuthService } from './auth.service';
import {first, subscribeOn} from 'rxjs/operators';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have logged in as false', () => {
    service.isLoggedIn.subscribe(loggedIn => {
      expect(loggedIn).toBeFalsy();
    });
  });

  describe('login', () => {
    it('with no duration should update observable to true', () => {
      service.login(0);
      service.isLoggedIn.subscribe(loggedIn => {
        expect(loggedIn).toBeTruthy();
      });
    });

    it('with no duration should stay logged in', fakeAsync(() => {
      service.login();
      service.isLoggedIn.pipe(first()).subscribe(loggedIn => {
        expect(loggedIn).toBeTruthy();
      });
      tick(20000);
      service.isLoggedIn.subscribe(loggedIn => {
        expect(loggedIn).toBeTruthy();
      });
    }));

    it('with duration should log back out after duration elapses', fakeAsync(() => {
      service.login(2000);
      service.isLoggedIn.pipe(first()).subscribe(loggedIn => {
        expect(loggedIn).toBeTruthy();
      });
      tick(2000);
      service.isLoggedIn.subscribe(loggedIn => {
        expect(loggedIn).toBeFalse();
      });
    }));
  });
});
