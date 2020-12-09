import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Person} from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private people: Person[] = [];
  private personSubject = new BehaviorSubject(this.people);
  people$ = this.personSubject.asObservable();

  constructor() { }

  addPerson(person: Person): void {
    this.people.push(person);
    this.personSubject.next(this.people);
  }
}
