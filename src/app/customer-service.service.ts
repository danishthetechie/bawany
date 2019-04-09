import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  allCustomers;
  customer;
  constructor(private router: Router,public db: AngularFireDatabase) {
    db.list('/customers')
    .valueChanges()
    .subscribe(res => {
      this.allCustomers=res;
   });
  }

 getCustomers(){
  
  this.db.list('/customers')
  .valueChanges()
  .subscribe(res => {
    this.allCustomers=res;
    return this.allCustomers;

  });
 } 

 getCustomerById(id){
   for(let cust in this.allCustomers){
     if(this.allCustomers[cust].customerId==id){
       return this.customer=this.allCustomers[cust];
      }
   }
   return 0;
 }
}
