import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HuidshoudboekjeLijstComponent} from "./huidshoudboekje-lijst/huidshoudboekje-lijst.component";
import {HuishoudboekjeDetailsComponent} from "./huishoudboekje-details/huishoudboekje-details.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'huishoudboekjes-overzicht', component: HuidshoudboekjeLijstComponent, canActivate: [AuthGuard] },
  { path: 'huishoudboekje/:id', component: HuishoudboekjeDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
