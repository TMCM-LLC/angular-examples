import {of} from 'rxjs';

export class AuthServiceMock {
  isLoggedIn = of(false);
  login(duration?: number): void {}
  logout(): void {}
}
