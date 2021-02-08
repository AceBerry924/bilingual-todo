import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import { auth, User } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
  ) { }

  async loginWithEmail(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['admin/list']);
  }

  // async loginWithGoogle() {
  //   await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  //   this.router.navigate(['admin/list']);
  // }

  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async createUser(name: string, email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({
        displayName: name
      });

      console.log('userCredential', userCredential);
      await this.insertUserData(userCredential.user);
      this.router.navigate(['/dashboard']);
    } catch (error) {

    }
  }

  insertUserData(user: any) {
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

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
