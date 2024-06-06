import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FestivalDetailsComponent } from './festival-details/festival-details.component';
import { FestivalListComponent } from './festival-list/festival-list.component';
import {HuidshoudboekjeLijstComponent} from "./huidshoudboekje-lijst/huidshoudboekje-lijst.component";

const routes: Routes = [
  { path: '', redirectTo: 'huishoudboekjes-overzicht', pathMatch: 'full' },
  { path: 'overview', component: FestivalListComponent },
  { path: 'festival/:id', component: FestivalDetailsComponent },
  { path: 'huishoudboekjes-overzicht', component: HuidshoudboekjeLijstComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
