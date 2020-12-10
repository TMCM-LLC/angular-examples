import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../models/person';
import { faSmile, faFrown } from '@fortawesome/free-regular-svg-icons';
import {PersonService} from '../../services/person.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  addPersonForm: FormGroup;
  people: Person[];
  faSmile = faSmile;
  faFrown = faFrown;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.people$.subscribe(peeps => {
      this.people = peeps;
    });

    this.addPersonForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nice: new FormControl(false)
    });
  }

  submitPerson(): void {
    if (this.addPersonForm.invalid) {
      return;
    }

    const newPerson: Person = {
      name: this.addPersonForm.get('name').value,
      nice: this.addPersonForm.get('nice').value
    };
    this.personService.addPerson(newPerson);

    this.addPersonForm.reset();
  }
}
