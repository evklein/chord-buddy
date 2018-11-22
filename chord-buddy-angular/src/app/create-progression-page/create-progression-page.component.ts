import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-progression-page',
  templateUrl: './create-progression-page.component.html',
  styleUrls: ['./create-progression-page.component.css']
})
export class CreateProgressionPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
