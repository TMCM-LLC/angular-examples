import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObservablesComponent} from './components/observables/observables.component';
import {FormsComponent} from './components/forms/forms.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'observables',
    pathMatch: 'full'
  },
  {
    path: 'observables',
    component: ObservablesComponent
  },
  {
    path: 'forms',
    component: FormsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
