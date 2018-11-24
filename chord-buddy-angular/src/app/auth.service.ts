import { Injectable, Output } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GeneralService } from './general.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();
  sessionToken = null;

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
        this.saveTokenAndID(res)
        resolve(res);
      });
    });
  }

  saveTokenAndID(firebaseResponse) {
    this.sessionToken = {
      'firebaseToken': firebaseResponse.credential.idToken,
      'userEmail': firebaseResponse.user.email,
      'userName': firebaseResponse.user.displayName
    }

    this.generalService.apiGet('api/login/' + this.sessionToken.userEmail, (data) => {
      if (data.length == 0) {
        this.registerNewUser();
      } else {
        this.sessionToken.userID = data[0].id;
        this.router.navigateByUrl('/view-progressions');
        this.getLoggedIn.emit(true);
      }
    });
  }

  registerNewUser() {
    this.generalService.apiPost('api/register', { 'email' : this.sessionToken.userEmail, 
      'name': this.sessionToken.userName }, (data) => {
      this.sessionToken.userID = data.insertId;
      this.getLoggedIn.emit(true);
      this.router.navigateByUrl('/view-progressions');
    });
  }

  logout() {
    this.getLoggedIn.emit(false);
    this.sessionToken = null;
    this.router.navigateByUrl('/');
  }

  // Verify user logged in status and redirect to login if not logged in.
  verifyUserToken() {
    if (!this.sessionToken) {
      this.router.navigateByUrl('/');
    }
  }

  isLoggedIn() {
    if (this.sessionToken) return true;
    return false;
  }
}
