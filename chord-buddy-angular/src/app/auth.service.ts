import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GeneralService } from './general.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Firebase data
  firebaseToken;
  userEmail;

  // This data is linked from our server. 
  userID;

  constructor(private angularFireAuth: AngularFireAuth, 
    private generalService: GeneralService,
    private router: Router) { }

  doGoogleAuthentication() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.firebaseToken = res.credential['idToken'];
        this.saveTokenAndID(res)
        resolve(res);
      });
    });
  }

  saveTokenAndID(firebaseResponse) {
    this.firebaseToken = firebaseResponse.credential.idToken;
    this.userEmail = firebaseResponse.user.email;

    this.generalService.apiGet('api/login/' + this.userEmail, (data) => {
      if (data.length == 0) {
        this.registerNewUser();
      } else {
        this.userID = data[0].id;
        this.router.navigateByUrl('/view-progressions');
        console.log('Logged in...');
      }
    });
  }

  registerNewUser() {
    this.generalService.apiPost('api/register', { 'email' : this.userEmail }, (data) => {
      this.userID = data.insertId;
      this.router.navigateByUrl('/view-progressions');
    });
  }

  logout() {
    this.firebaseToken = null;
    this.userEmail = null;
    this.userID = 0;
    this.router.navigateByUrl('/');
  }

  // Verify user logged in status and redirect to login if not logged in.
  verifyUserToken() {
    if (!this.userID) {
      this.router.navigateByUrl('/');
    }
  }

  isLoggedIn() {
    if (this.userID) {
      return true;
    }
    return false;
  }
}
