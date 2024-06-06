import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FestivalListComponent } from './festival-list/festival-list.component';
import { FestivalDetailsComponent } from './festival-details/festival-details.component';
import { FestivalCreateComponent } from './festival-create/festival-create.component';
import { FestivalSearchPipe } from './festival-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FestivalListComponent,
    FestivalDetailsComponent,
    FestivalCreateComponent,
    FestivalSearchPipe
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
