import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private afs: AngularFireAuth) { }

  registerEmailAndPass(user: {email: string, password: string}) {
    return this.afs.createUserWithEmailAndPassword(user.email, user.password)
  }

  signInEmailAndPass(user: {email: string, password: string}) {
    return this.afs.signInWithEmailAndPassword(user.email, user.password)
  }

  signOut() {
    return this.afs.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.afs.authState.pipe(
      map(user => !!user) // Map user object to boolean
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.afs.authState.pipe(
      map(user => user !== null)
    );
  }
}
