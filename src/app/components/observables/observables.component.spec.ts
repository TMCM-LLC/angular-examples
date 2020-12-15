import {ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ObservablesComponent } from './observables.component';
import {AuthService} from '../../services/auth.service';
import {AuthServiceMock} from '../../services/auth.service.mock';
import clock = jasmine.clock;

describe('ObservablesComponent', () => {
  let component: ObservablesComponent;
  let fixture: ComponentFixture<ObservablesComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservablesComponent ],
      providers: [
        { provide: AuthService, useValue: new AuthServiceMock() }
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when login button clicked should trigger login', () => {
    spyOn(authService, 'login').and.stub();
    const btn = document.getElementById('loginButton') as HTMLElement;
    btn.click();
    expect(authService.login).toHaveBeenCalled();
  });

  it('when logout button clicked should trigger logout', () => {
    spyOn(authService, 'logout').and.stub();
    const btn = document.getElementById('logoutButton') as HTMLElement;
    btn.click();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('when delayed logout button clicked should trigger login with duration', () => {
    spyOn(authService, 'login').and.stub();
    const btn = document.getElementById('loginDelayedButton') as HTMLElement;
    btn.click();
    expect(authService.login).toHaveBeenCalledWith(3000);
  });

  describe('when count button clicked', () => {

    [1, 2, 5, 7].forEach(num => {
      it(`should add item to screen after ${num} second`, fakeAsync(() => {
        const btn = document.getElementById('countBtn') as HTMLElement;
        btn.click();
        fixture.detectChanges();
        tick(num * 1000);
        fixture.detectChanges();
        const items = document.querySelectorAll('.item');
        expect(items.length).toEqual(num);
        discardPeriodicTasks();
      }));
    });

    it('should add max 7 items to screen', fakeAsync(() => {
      const btn = document.getElementById('countBtn') as HTMLElement;
      btn.click();
      fixture.detectChanges();
      tick(10000);
      fixture.detectChanges();
      const items = document.querySelectorAll('.item');
      expect(items.length).toEqual(7);
      discardPeriodicTasks();
    }));

    it('should stop adding items to screen after stop clicked', () => {
      clock().install();
      const btn = document.getElementById('countBtn') as HTMLElement;
      btn.click();
      fixture.detectChanges();
      clock().tick(3000);

      const btn2 = document.getElementById('stopCountBtn') as HTMLElement;
      btn2.click();
      fixture.detectChanges();
      clock().tick(3000);

      const items = document.querySelectorAll('.item');
      expect(items.length).toEqual(3);
      clock().uninstall();
    });
  });
});
