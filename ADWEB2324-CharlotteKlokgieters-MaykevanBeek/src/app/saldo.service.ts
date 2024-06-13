import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot, collection, doc, addDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import {Saldo} from "./models/saldo.model";
import {Categorie} from "./models/categorie.model";
import { CategorieService } from "./categorie.service";


@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  firestore: Firestore;
  categorieService: CategorieService;

  constructor(categorieService: CategorieService) {
    // Firebase configuration
    const firebaseConfig = environment.firebase;

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    this.firestore = getFirestore(app);

    this.categorieService = categorieService;
  }

  addSaldo(saldo: Saldo) {
    const { id, ...object } = Object.assign({}, saldo);
    const currentDate = new Date().toISOString().split('T')[0];
    object.datum = currentDate;
    addDoc(collection(this.firestore, 'Saldo'), object);
  }

  getInkomsten(huishoudboekje: string | null | undefined) {
    return new Observable((subscriber: Subscriber<Saldo[]>) => {
      onSnapshot(collection(this.firestore, 'Saldo'), (snapshot) => {
        let saldo = snapshot.docs.map((doc: any) => {
          let individualSaldo = doc.data();
          individualSaldo['id'] = doc.id;
          individualSaldo.bedrag = parseFloat(individualSaldo.bedrag).toFixed(2);
          return individualSaldo;
        });

        let filteredSaldo = saldo.filter((s: Saldo) => s.huishoudboekje === huishoudboekje);
        let positiveSaldo = filteredSaldo.filter((s: Saldo) => s.bedrag > 0);
        positiveSaldo.sort((a: Saldo, b: Saldo) => {
          return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });

        subscriber.next(positiveSaldo);
      });
    });
  }

  getUitgaven(huishoudboekje: string | null | undefined) {
    return new Observable((subscriber: Subscriber<Saldo[]>) => {
      onSnapshot(collection(this.firestore, 'Saldo'), (snapshot) => {
        let saldo = snapshot.docs.map((doc: any) => {
          let individualSaldo = doc.data();
          individualSaldo['id'] = doc.id;
          individualSaldo.bedrag = parseFloat(individualSaldo.bedrag).toFixed(2);
          individualSaldo.datum = new Date(individualSaldo.datum);
          return individualSaldo;
        });

        let filteredSaldo = saldo.filter((s: Saldo) => s.huishoudboekje === huishoudboekje);
        let negativeSaldo = filteredSaldo.filter((s: Saldo) => s.bedrag < 0);
        negativeSaldo.sort((a: Saldo, b: Saldo) => {
          return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });

        subscriber.next(negativeSaldo);
      });
    });
  }

  async updateSaldo(saldo: Saldo) {
    let oldSaldo;
    if (saldo) {
      oldSaldo = await this.getSaldo(saldo.id);
    }

    const { id, ...object } = Object.assign({}, saldo);
    const currentDate = new Date().toISOString().split('T')[0];
    object.datum = currentDate;
    updateDoc(doc(this.firestore, "Saldo", saldo.id), object);

    if (saldo.categorie) {
      const categorie = await this.categorieService.getCategorieOfSaldo(saldo.categorie.id);
      if (categorie != undefined && oldSaldo != null && oldSaldo != undefined) {
        let newBudget = parseFloat(categorie.huidigBudget.toString()) - parseFloat(oldSaldo.bedrag.toString());
        categorie.huidigBudget = newBudget;
        newBudget = parseFloat(categorie.huidigBudget.toString()) + parseFloat(saldo.bedrag.toString());
        categorie.huidigBudget = newBudget;
        this.categorieService.updateCategorie(categorie);
      }
    }
  }

  async updateCategorieOfSaldo(saldo: Saldo, oldCategorie: Categorie) {
    const { id, ...object } = Object.assign({}, saldo);
    updateDoc(doc(this.firestore, "Saldo", saldo.id), object);

    if ((saldo.categorie && !oldCategorie) || (oldCategorie && saldo.categorie && saldo.categorie.id != oldCategorie.id)) {
      const categorieNew = await this.categorieService.getCategorieOfSaldo(saldo.categorie.id);
      if (categorieNew != undefined) {
        const newBudget = parseFloat(categorieNew.huidigBudget.toString()) + parseFloat(saldo.bedrag.toString());
        categorieNew.huidigBudget = newBudget;
        this.categorieService.updateCategorie(categorieNew);
      }
    }
    if (oldCategorie && saldo.categorie && saldo.categorie.id != oldCategorie.id) {
      const categorieOld = await this.categorieService.getCategorieOfSaldo(oldCategorie.id);
      if (categorieOld != undefined) {
        const newBudget = parseFloat(categorieOld.huidigBudget.toString()) - parseFloat(saldo.bedrag.toString());
        categorieOld.huidigBudget = newBudget;
        this.categorieService.updateCategorie(categorieOld);
      }
    }
  }

  async deleteSaldo(saldo: Saldo) {
    if (saldo.categorie) {
      const categorieNew = await this.categorieService.getCategorieOfSaldo(saldo.categorie.id);
      if (categorieNew != undefined) {
        const newBudget = parseFloat(categorieNew.huidigBudget.toString()) - parseFloat(saldo.bedrag.toString());
        categorieNew.huidigBudget = newBudget;
        this.categorieService.updateCategorie(categorieNew);
      }
    }

    deleteDoc(doc(this.firestore, "Saldo", saldo.id));
  }

  async getSaldo(id: string): Promise<Saldo | undefined> {
    if (id == "") {
      return undefined;
    } else {
      const snapshot = await getDoc(doc(this.firestore, "Saldo", id));
      if (snapshot.exists()) {
        const saldo = snapshot.data() as Saldo;
        saldo.id = snapshot.id;
        return saldo;
      } else {
        return undefined;
      }
    }
  }
}

