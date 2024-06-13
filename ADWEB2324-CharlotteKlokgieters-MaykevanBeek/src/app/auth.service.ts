import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private afs: AngularFireAuth) { }

  registerEmailAndPass(user: {email: string, password: string}) {
    /*return this.afs.createUserWithEmailAndPassword(user.email, user.password)*/
    return new Observable((observer) => {
      this.afs.createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          observer.next(userCredential);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

  signInEmailAndPass(user: {email: string, password: string}) {
    /*return this.afs.signInWithEmailAndPassword(user.email, user.password)*/
    return new Observable((observer) => {
      this.afs.signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          observer.next(userCredential);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

  signOut() {
    /*return this.afs.signOut();*/
    return new Observable((observer) => {
      this.afs.signOut()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    })
  }

  isAuthenticated(): Observable<boolean> {
    return this.afs.authState.pipe(
      map(user => !!user)
    );
  }

  getCurrentUserId(): Observable<string | undefined> {
    return this.afs.authState.pipe(
      map(user => user?.uid)
    );
  }
}
