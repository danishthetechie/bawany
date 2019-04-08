import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {formatDate } from '@angular/common';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  searchText;
  customerList;
  customerListSearch=[];
  
  date ;
  role;
  username;
  constructor(private router: Router,public db: AngularFireDatabase) { 
    const bDate: Date = new Date();
     this.date= bDate.toISOString().substring(0, 10);
    //= new Date().getDate();
    db.list('/customers')
    .valueChanges()
    .subscribe(res => {
      this.customerList=res;
      for(let cust in this.customerList){
        this.customerListSearch.push({customerId:this.customerList[cust].customerId,
                title:this.customerList[cust].title,
                customerName:this.customerList[cust].customerName,
                customerContact:this.customerList[cust].customerContact,
                balance:this.customerList[cust].balance});
      }
      console.log(this.customerListSearch);
      
      console.log(this.customerList);
      console.log(this.date);
      
    });
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
  }

  async addCustomer(customer:NgForm){
    let count = 0;
    if(this.customerList !=null){
            for (var key in this.customerList) { // fetching bookings for the users                   
              //this.book=this.dbBooking[key];
              count=this.customerList[key].customerId;
              
              count++;
    
            }
    }
    if(count == 0){
      count = 1;
    }
    this.db.list('/customers').push({
      customerId: count,
      title:customer.value.title,
      customerName: customer.value.custName,
      customerContact: customer.value.contact,
      customerAddress: customer.value.address,
      reference: customer.value.reference,
      balance:0,
      addedBy: this.username,
      addDate: this.date
    });
    this.customerListSearch=[]; 
    alert("Successfully Added"); 
    

  }
  transform(customers: any, searchText: any): any {
    if(searchText == null) return customers;
    else if(searchText == "") return customers;
    return customers.filter(function(std){
      let balance:string =""+std.balance;
      return std.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
       std.customerName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
       std.customerContact.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || 
       balance.toLowerCase().indexOf(searchText.toLowerCase()) > -1 
       ;
    })
  }
  searchBox(){
    this.customerListSearch=this.transform(this.customerList,this.searchText)
  }

}
