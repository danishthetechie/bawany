import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { CustomerServiceService } from './customer-service.service'; 



import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatAutocompleteModule } from '@angular/material';
import { CustomerComponent } from './customer/customer.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { MakeBillComponent } from './make-bill/make-bill.component';
import { VendorComponent } from './vendor/vendor.component';

import { TypeaheadModule } from 'ngx-bootstrap';
import { MakeCustomerPaymentComponent } from './make-customer-payment/make-customer-payment.component';
import { CustomerLedgerComponent } from './customer-ledger/customer-ledger.component';
import { VendorLedgerComponent } from './vendor-ledger/vendor-ledger.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeLoginComponent,
    NavbarComponent,
    MyNavComponent,
    CustomerComponent,
    FooterComponent,
    RegisterComponent,
    MakeBillComponent,
    VendorComponent,
    MakeCustomerPaymentComponent,
    CustomerLedgerComponent,
    VendorLedgerComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeLoginComponent
      }
    ]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule
  ],
  providers: [CustomerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
