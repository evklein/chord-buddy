import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInStatus = false;

  constructor(private authService: AuthService) {
    authService.getLoggedIn.subscribe((status) => this.changeStatus(status));
   }

  ngOnInit() {}

  changeStatus(val) {
    console.log("Changing status: " + val);
    this.loggedInStatus = val;
  }
}
