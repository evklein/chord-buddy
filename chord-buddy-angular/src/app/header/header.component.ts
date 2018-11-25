import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() loggedInStatus = false;

  constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {
    authService.getLoggedIn.subscribe((status) => this.changeStatus(status));
    }

  ngOnInit() {}

  changeStatus(val) {
    this.loggedInStatus = val;

  }
}
