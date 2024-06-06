import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FestivalDetailsComponent } from './festival-details/festival-details.component';
import { FestivalListComponent } from './festival-list/festival-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: FestivalListComponent },
  { path: 'festival/:id', component: FestivalDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
