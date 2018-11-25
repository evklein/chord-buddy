import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-progressions-page',
  templateUrl: './view-progressions-page.component.html',
  styleUrls: ['./view-progressions-page.component.css']
})
export class ViewProgressionsPageComponent implements OnInit {

  constructor(private generalService: GeneralService, private authService: AuthService) { }

  userID = this.authService.sessionToken.userID;
  searchTerm = '';
  onlyShowUserProgressions = false;
  progressionsToShow = [];

  ngOnInit() {
    this.authService.verifyUserToken();
    this.getProgressions();
  }

  getProgressions() {
    let trueSearchTerm = this.searchTerm;
    if (this.searchTerm === '') trueSearchTerm = 'none';

    let apiString = 'api/progressions/' + this.userID + '/' + this.onlyShowUserProgressions + '/' + trueSearchTerm;
    this.generalService.apiGet(apiString, (data) => {
      this.progressionsToShow = data;
      this.parseProgressionStrings();
      this.getOwnerNames();
      this.sortProgressionsByLikes();
    });
  }

  parseProgressionStrings() {
    this.progressionsToShow.forEach(progression => {
      var progressionArray = progression.progression_string.split('|');
      progression.progressionArray = progressionArray;
    });
  }

  getOwnerNames() {
    let apiString = 'api/users/';
    this.progressionsToShow.forEach(progression => {
      this.generalService.apiGet(apiString +  progression.owner_id, (data) => {
        progression.ownerName = data[0].name;
      });
    });
  }

  sortProgressionsByLikes() {
    this.progressionsToShow.sort((first, second) => {
      if (first.num_likes < second.num_likes)  return 1;
      else if (first.num_likes > second.num_likes) return -1;
      else return 0;
    });
  }

  likeProgression(id) {
    this.generalService.apiPost('api/like', { 'progressionID': id }, (data) => {});
  }
}
