import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot, collection, doc, addDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { Categorie } from "./models/categorie.model";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  firestore: Firestore;

  constructor() {
    // Firebase configuration
    const firebaseConfig = environment.firebase;

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);
  }

  getCategorieen(huishoudboekje: string | null | undefined): Observable<Categorie[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'Categorieen'), (snapshot) => {
        let categorieen = snapshot.docs.map((doc: any) => {
          let categorie = doc.data();
          categorie['id'] = doc.id;
          return categorie;
        });

        let filteredCategories = categorieen.filter((s: Categorie) => s.huishoudboekje === huishoudboekje);
        subscriber.next(filteredCategories);
      });
    });
  }

  async getCategorieOfSaldo(id: string): Promise<Categorie | undefined> {
    if (id == "") {
      return undefined;
    } else {
      const snapshot = await getDoc(doc(this.firestore, "Categorieen", id));
      if (snapshot.exists()) {
        const categorie = snapshot.data() as Categorie;
        categorie.id = snapshot.id;
        return categorie;
      } else {
        return undefined;
      }
    }
  }

  addCategorie(categorie: Categorie) {
    // @ts-ignore
    categorie.budget = parseFloat(categorie.budget)
    categorie.huidigBudget = categorie.budget
    const { id, ...object } = Object.assign({}, categorie);
    return addDoc(collection(this.firestore, 'Categorieen'), object);
  }


  deleteCategorie(categorie: Categorie) {
    deleteDoc(doc(this.firestore, "Categorieen", categorie.id));
  }

  updateCategorie(categorie: Categorie) {
    const { id, ...object } = Object.assign({}, categorie);
    updateDoc(doc(this.firestore, "Categorieen", categorie.id), object);
  }
}

