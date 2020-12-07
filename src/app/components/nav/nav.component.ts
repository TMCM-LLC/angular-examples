import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IconDefinition, faSmile, faFrown} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  loggedInIcon: IconDefinition;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.loggedInIcon = faSmile;
      } else {
        this.loggedInIcon = faFrown;
      }
    });
  }

}
