import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from 'src/app/_models/user.model';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<firebase.User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private notification: NotificationService,
  ) {
    this.authState = this.afAuth.authState;
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
      this.notification.open({ value: 'Successfully logged in', id: '@@loginSuccess' });
    } catch (err) {
      this.notification.open(err.message);
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if (userCredential.user) {
        await this.insertUserData(userCredential.user);
        this.router.navigate(['/dashboard']);
      }
    } catch (err) {
      this.notification.open(err.message);
    }
  }

  async createUser(name: string, email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({
        displayName: name
      });

      await this.insertUserData(userCredential.user);
      this.router.navigate(['/dashboard']);
    } catch (err) {
      this.notification.open(err.message);
    }
  }

  insertUserData(user: any): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`Users/${user.uid}`);

    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userState, {
      merge: true
    });
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();

    this.notification.open({ value: 'Signed out', id: '@@signOut' });
    this.router.navigate(['/login']);
  }
}
