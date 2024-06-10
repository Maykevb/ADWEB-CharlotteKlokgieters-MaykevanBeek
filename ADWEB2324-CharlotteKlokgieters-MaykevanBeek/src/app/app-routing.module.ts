import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HuidshoudboekjeLijstComponent} from "./huidshoudboekje-lijst/huidshoudboekje-lijst.component";
import {HuishoudboekjeDetailsComponent} from "./huishoudboekje-details/huishoudboekje-details.component";

const routes: Routes = [
  { path: '', redirectTo: 'huishoudboekjes-overzicht', pathMatch: 'full' },
  { path: 'huishoudboekjes-overzicht', component: HuidshoudboekjeLijstComponent },
  { path: 'huishoudboekje/:id', component: HuishoudboekjeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
