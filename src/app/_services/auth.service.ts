import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private notification: NotificationService,
  ) { }

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
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
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`Users/${user.uid}`);

    const userState: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userState, {
      merge: true
    })
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
