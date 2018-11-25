import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-create-progression-page',
  templateUrl: './create-progression-page.component.html',
  styleUrls: ['./create-progression-page.component.css']
})
export class CreateProgressionPageComponent implements OnInit {

  progressionList = [];
  progressionName = '';
  shareable = false;

  constructor(private authService: AuthService, private generalService: GeneralService) { }

  ngOnInit() {
    this.authService.verifyUserToken();
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
    if (!this.validateData()) return;

    let postData = {
      'progressionString': this.stringifyProgressionList(),
      'name': this.progressionName,
      'numChords': this.progressionList.length,
      'shareable': this.shareable ? 1 : 0,
      'ownerID': this.authService.sessionToken.userID
    };
    
    this.generalService.apiPost('api/progressions', postData, (data) => {
      alert('Progression saved successfully!');
      this.deleteProgression();
    });
  }

  deleteChord(index) {
    this.progressionList.splice(index, 1);
  }

  deleteProgression() {
    this.progressionList = [];
    this.progressionName = '';
  }

  validateData() {
    if (this.progressionName === '') {
      alert('Please add a name before saving.');
      return false;
    } else if (this.progressionList.length === 0) {
      alert('Your progression is empty, please add some chords before submitting.');
      return false;
    }

    return true;
  }
}
