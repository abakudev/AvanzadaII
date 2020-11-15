import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentAddComponent } from './components/incident-add/incident-add.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
{path: 'list', component: IncidentListComponent},
{path: 'add', component: IncidentAddComponent},
{path: '', redirectTo: 'list', pathMatch: 'full'},
{path: '**', component: NotFoundComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }