import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-create-progression-page',
  templateUrl: './create-progression-page.component.html',
  styleUrls: ['./create-progression-page.component.css']
})
export class CreateProgressionPageComponent implements OnInit {

  progressionList = [];
  progressionName = '';

  constructor(private authService: AuthService, private generalService: GeneralService) { }

  ngOnInit() {
    this.authService.verifyUserToken();
  }

  addToProgressionList(chord) {
    console.log('pushing... ' + chord);
    this.progressionList.push(chord);
  }

  modifyProgressionList(index, modifier) {

  }

  stringifyProgressionList() {
    let string = this.progressionList[0];
    for (var i = 1; i < this.progressionList.length; i++) {
      string += '|' + this.progressionList[i];
    }
    return string;
  }

  saveProgression() {
    let postData = {
      'progressionString': this.stringifyProgressionList(),
      'name': this.progressionName,
      'numChords': this.progressionList.length,
      'shareable': 1, // todo,
      'ownerID': this.authService.userID
    };
    
    this.generalService.apiPost('api/progressions', postData, (data) => {
      console.log(data);
    });
  }
}
