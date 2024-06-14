import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot, collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { Huishoudboekje } from "../models/huishoudboekje.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HuishoudboekjeService {
  firestore: Firestore;

  constructor() {
    // Firebase configuration
    const firebaseConfig = environment.firebase;

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);
  }

  getHuishoudboekjes(): Observable<Huishoudboekje[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'Huishoudboekjes'), (snapshot) => {
        let huishoudboekjes = snapshot.docs.map((doc: any) => {
          let huishoudboekje = doc.data();
          huishoudboekje['id'] = doc.id;
          return huishoudboekje;
        });
        subscriber.next(huishoudboekjes);
      });
    });
  }

  getHuishoudboekje(id: string): Observable<Huishoudboekje | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firestore, "Huishoudboekjes", id), (doc) => {
          let huishoudboekje = doc.data() ?? null;
          if (huishoudboekje) {
            huishoudboekje['id'] = doc.id;
          }
          subscriber.next(huishoudboekje);
        });
      }
    })
  }

  addHuishoudboekje(huishoudboekje: Huishoudboekje) {
    const { id, ...object } = Object.assign({}, huishoudboekje);
    addDoc(collection(this.firestore, 'Huishoudboekjes'), object);
  }

  updateHuishoudboekje(huishoudboekje: Huishoudboekje) {
    const { id, ...object } = Object.assign({}, huishoudboekje);
    updateDoc(doc(this.firestore, "Huishoudboekjes", huishoudboekje.id), object);
  }
}

