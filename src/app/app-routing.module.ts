import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './register/register.component';
import { MakeBillComponent } from './make-bill/make-bill.component';
import { VendorComponent } from './vendor/vendor.component';
import { MakeCustomerPaymentComponent } from './make-customer-payment/make-customer-payment.component';
import { CustomerLedgerComponent } from './customer-ledger/customer-ledger.component';
import { VendorLedgerComponent } from './vendor-ledger/vendor-ledger.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home-login', component: HomeLoginComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'make-bill', component: MakeBillComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'make-customer-payment', component: MakeCustomerPaymentComponent },
  { path: 'customer-ledger', component: CustomerLedgerComponent },
  { path: 'vendor-ledger', component: VendorLedgerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
