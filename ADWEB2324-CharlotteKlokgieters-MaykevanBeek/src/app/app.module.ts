import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HuidshoudboekjeLijstComponent } from './components/huidshoudboekje-lijst/huidshoudboekje-lijst.component';
import { HuishoudboekjeCreeerComponent } from './components/huishoudboekje-creeer/huishoudboekje-creeer.component';
import { HuishoudboekjeZoekPipe} from "./services/huishoudboekje-zoek.pipe";
import { SaldoCreeerComponent } from './components/saldo-creeer/saldo-creeer.component';
import { CategorieCreeerComponent } from './components/categorie-creeer/categorie-creeer.component';
import { HuishoudboekjeDetailsComponent } from "./components/huishoudboekje-details/huishoudboekje-details.component";
import { CategorieLijstComponent } from './components/categorie-lijst/categorie-lijst.component';
import { SaldoLijstComponent } from './components/saldo-lijst/saldo-lijst.component';
import { BaseChartDirective } from "ng2-charts";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

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
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
