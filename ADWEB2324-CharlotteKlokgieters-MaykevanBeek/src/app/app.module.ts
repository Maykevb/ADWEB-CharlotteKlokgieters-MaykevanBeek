import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HuidshoudboekjeLijstComponent } from './huidshoudboekje-lijst/huidshoudboekje-lijst.component';
import { HuishoudboekjeCreeerComponent } from './huishoudboekje-creeer/huishoudboekje-creeer.component';
import { HuishoudboekjeZoekPipe} from "./huishoudboekje-zoek.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HuidshoudboekjeLijstComponent,
    HuishoudboekjeCreeerComponent,
    HuishoudboekjeZoekPipe,
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
