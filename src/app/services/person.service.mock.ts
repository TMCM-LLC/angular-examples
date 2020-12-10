import {Person} from '../models/person';
import {Observable, of} from 'rxjs';

export class PersonServiceMock {

  people$: Observable<Person[]> = of([{ name: 'Phil', nice: true }]);

  addPerson(person: Person): void {
  }
}
