import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsComponent } from './forms.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PersonService} from '../../services/person.service';
import {PersonServiceMock} from '../../services/person.service.mock';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;
  let service: PersonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsComponent ],
      imports: [
        ReactiveFormsModule,
        FontAwesomeTestingModule
      ],
      providers: [
        { provide: PersonService, useValue: new PersonServiceMock() }
      ]
    })
    .compileComponents();

    service = TestBed.inject(PersonService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets current people when component created', () => {
    spyOn(service.people$, 'subscribe').and.callThrough();
    component.ngOnInit();
    expect(service.people$.subscribe).toHaveBeenCalled();
    expect(component.people[0]).toEqual(jasmine.objectContaining({ name: 'Phil' }));
  });

  describe('when adding person to list', () => {
    let btn;

    beforeEach(() => {
      btn = document.querySelector('.new-person-form .btn') as HTMLElement;
    });

    it('should require a name to submit', () => {
      spyOn(service, 'addPerson').and.callThrough();
      btn.click();
      fixture.detectChanges();
      expect(service.addPerson).not.toHaveBeenCalled();
    });

    it('should pass person data to service when added', () => {
      const input = document.querySelector('.new-person-form input[formControlName="name"]') as HTMLInputElement;
      input.value = 'Francisco';
      input.dispatchEvent(new Event('input'));

      const checkbox = document.querySelector('.new-person-form input[formControlName="nice"]') as HTMLInputElement;
      checkbox.click();

      spyOn(service, 'addPerson').and.callThrough();
      btn.click();
      fixture.detectChanges();
      expect(service.addPerson).toHaveBeenCalledWith(jasmine.objectContaining({
        name: 'Francisco',
        nice: true
      }));
    });
  });
});
