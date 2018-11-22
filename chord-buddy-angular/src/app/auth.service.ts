import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token;

  constructor(public angularFireAuth: AngularFireAuth) { }

  doGoogleAuthentication() {
    console.log('Google Authenticating...');
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      console.log('Were trying here...');
      this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        console.log('what');
        console.log(res);
        this.token = res.credential['idToken'];
        resolve(res);
      })
    });
  }
}
