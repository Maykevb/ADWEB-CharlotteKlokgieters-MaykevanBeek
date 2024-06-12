import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot, collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {Saldo} from "./models/saldo.model";
import {Categorie} from "./models/categorie.model";

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
    const currentDate = new Date().toISOString().split('T')[0];
    object.datum = currentDate;
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
        positiveSaldo.sort((a: Saldo, b: Saldo) => {
          return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });

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
          individualSaldo.datum = new Date(individualSaldo.datum);
          return individualSaldo;
        });

        let negativeSaldo = saldo.filter((s: Saldo) => s.bedrag < 0);
        negativeSaldo.sort((a: Saldo, b: Saldo) => {
          return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });

        subscriber.next(negativeSaldo);
      });
    });
  }

  updateSaldo(saldo: Saldo) {
    const { id, ...object } = Object.assign({}, saldo);
    const currentDate = new Date().toISOString().split('T')[0];
    object.datum = currentDate;
    updateDoc(doc(this.firestore, "Saldo", saldo.id), object);
  }

  deleteSaldo(saldo: Saldo) {
    deleteDoc(doc(this.firestore, "Saldo", saldo.id));
  }
}

