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
    //this.authService.verifyUserToken();
  }

  addToProgressionList(chord) {
    this.progressionList.push({ 'rootNote': chord, 'modifier': '', 'addIntervals': '' });
  }

  stringifyProgressionList() {
    let string = this.progressionList[0].rootNote + this.progressionList[0].modifier + this.progressionList[0].addIntervals;
    for (var i = 1; i < this.progressionList.length; i++) {
      let chord = this.progressionList[i];
      string += '|' + chord.rootNote + chord.modifier + chord.addIntervals;
    }
    return string;
  }

  addChordModifier(index, modifier) {
    this.progressionList[index].modifier = modifier;
  }

  addChordIntervals(index, addInterval) {
    if (this.progressionList[index].addIntervals.includes(addInterval)) return;

    this.progressionList[index].addIntervals += addInterval;
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
