import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home-login', component: HomeLoginComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
