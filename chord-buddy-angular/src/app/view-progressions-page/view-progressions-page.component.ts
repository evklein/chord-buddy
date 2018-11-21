import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-view-progressions-page',
  templateUrl: './view-progressions-page.component.html',
  styleUrls: ['./view-progressions-page.component.css']
})
export class ViewProgressionsPageComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  userID = 1; // Todo
  progressionsToShow = [];

  ngOnInit() {
    let apiString = 'api/progressions/' + this.userID + '/false/none';
    this.generalService.apiGet(apiString, (data) => {
      this.progressionsToShow = data;
      console.log(this.progressionsToShow);
      this.parseProgressionStrings();
    });
  }

  // TODO will need to be a bit more fleshed out for final version, but this is a good start.
  parseProgressionStrings() {
    this.progressionsToShow.forEach(progression => {
      var progressionArray = progression.progression_string.split('|');
      progression.progressionArray = progressionArray;
      
      var newProgressionString = '';
      progressionArray.forEach(chord => {
        newProgressionString += chord + ' ';
      });
      progression.progression_string = newProgressionString;
    });
  }

}
