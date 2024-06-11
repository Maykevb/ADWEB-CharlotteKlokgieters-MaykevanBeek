import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot, collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {Categorie} from "./models/categorie.model";
import {Saldo} from "./models/saldo.model";

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
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

  addSaldo(saldo: Saldo) {
    const { id, ...object } = Object.assign({}, saldo);
    addDoc(collection(this.firestore, 'Saldo'), object);
  }

  getInkomsten() {
    return new Observable((subscriber: Subscriber<Saldo[]>) => {
      onSnapshot(collection(this.firestore, 'Saldo'), (snapshot) => {
        let saldo = snapshot.docs.map((doc: any) => {
          let individualSaldo = doc.data();
          individualSaldo['id'] = doc.id;
          individualSaldo.bedrag = parseFloat(individualSaldo.bedrag).toFixed(2);
          return individualSaldo;
        });

        let positiveSaldo = saldo.filter((s: Saldo) => s.bedrag > 0);

        subscriber.next(positiveSaldo);
      });
    });
  }

  getUitgaven() {
    return new Observable((subscriber: Subscriber<Saldo[]>) => {
      onSnapshot(collection(this.firestore, 'Saldo'), (snapshot) => {
        let saldo = snapshot.docs.map((doc: any) => {
          let individualSaldo = doc.data();
          individualSaldo['id'] = doc.id;
          individualSaldo.bedrag = parseFloat(individualSaldo.bedrag).toFixed(2);
          return individualSaldo;
        });

        let positiveSaldo = saldo.filter((s: Saldo) => s.bedrag < 0);

        subscriber.next(positiveSaldo);
      });
    });
  }
}

