import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HuidshoudboekjeLijstComponent } from './huidshoudboekje-lijst/huidshoudboekje-lijst.component';
import { HuishoudboekjeCreeerComponent } from './huishoudboekje-creeer/huishoudboekje-creeer.component';
import { HuishoudboekjeZoekPipe} from "./huishoudboekje-zoek.pipe";
import { SaldoCreeerComponent } from './saldo-creeer/saldo-creeer.component';
import { CategorieCreeerComponent } from './categorie-creeer/categorie-creeer.component';
import {HuishoudboekjeDetailsComponent} from "./huishoudboekje-details/huishoudboekje-details.component";
import { CategorieLijstComponent } from './categorie-lijst/categorie-lijst.component';
import { SaldoLijstComponent } from './saldo-lijst/saldo-lijst.component';

@NgModule({
  declarations: [
    AppComponent,
    HuidshoudboekjeLijstComponent,
    HuishoudboekjeCreeerComponent,
    HuishoudboekjeDetailsComponent,
    HuishoudboekjeZoekPipe,
    HuishoudboekjeDetailsComponent,
    SaldoCreeerComponent,
    CategorieCreeerComponent,
    CategorieLijstComponent,
    SaldoLijstComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
