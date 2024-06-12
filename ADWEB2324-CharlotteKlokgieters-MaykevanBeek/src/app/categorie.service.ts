import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot, collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {Categorie} from "./models/categorie.model";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  firestore: Firestore;

  constructor() {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAhtyu9y53K0cXHVGAJjBatmpX-fcbqx-4",
      authDomain: "angulartest-98ba7.firebaseapp.com",
      projectId: "angulartest-98ba7",
      storageBucket: "angulartest-98ba7.appspot.com",
      messagingSenderId: "957845730759",
      appId: "1:957845730759:web:fac447721bb19eb0f515e2"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    this.firestore = getFirestore(app);
  }

  getCategorieen(): Observable<Categorie[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'Categorieen'), (snapshot) => {
        let categorieen = snapshot.docs.map((doc: any) => {
          let categorie = doc.data();
          categorie['id'] = doc.id;
          return categorie;
        });
        subscriber.next(categorieen);
      });
    });
  }

  getCategorie(id: string): Observable<Categorie | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firestore, "Categorieen", id), (doc) => {
          let categorie = doc.data() ?? null;
          if (categorie) {
            categorie['id'] = doc.id;
          }
          subscriber.next(categorie);
        });
      }
    })
  }

  addCategorie(categorie: Categorie) {
    // @ts-ignore
    categorie.huidigBudget = categorie.budget
    const { id, ...object } = Object.assign({}, categorie);
    addDoc(collection(this.firestore, 'Categorieen'), object);
  }

  deleteCategorie(categorie: Categorie) {
    deleteDoc(doc(this.firestore, "Categorieen", categorie.id));
  }

  updateCategorie(categorie: Categorie) {
    const { id, ...object } = Object.assign({}, categorie);
    updateDoc(doc(this.firestore, "Categorieen", categorie.id), object);
  }
}

