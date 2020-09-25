import { ItemSwitchComponent } from './item-switch/item-switch.component';
import { SwitcherComponent } from './switcher/switcher.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { EmpListComponent } from './emp-list/emp-list.component';
import { SecondComponent } from './second/second.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signup-component', pathMatch: 'full' },
  { path: 'second-component', component: EmpListComponent},
  { path: 'first-component', component: CoursesComponent},

  { path: 'signup-component', component: SecondComponent},
  { path: 'login-component', component: LoginComponent},
  { path: 'switch-component', component: SwitcherComponent},
  { path: 'item-component', component: ItemSwitchComponent},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
