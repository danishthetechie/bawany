import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {formatDate } from '@angular/common';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  searchText;
  vendorList;
  vendorListSearch=[];
  
  date ;
  role;
  username;
  constructor(private router: Router,public db: AngularFireDatabase) { 
    const bDate: Date = new Date();
     this.date= bDate.toISOString().substring(0, 10);
    //= new Date().getDate();
    db.list('/vendors')
    .valueChanges()
    .subscribe(res => {
      this.vendorList=res;
      for(let cust in this.vendorList){
        this.vendorListSearch.push({vendorId:this.vendorList[cust].vendorId,
                title:this.vendorList[cust].title,
                vendorName:this.vendorList[cust].vendorName,
                vendorContact:this.vendorList[cust].vendorContact,
                balance:this.vendorList[cust].balance});
      }
      console.log(this.vendorListSearch);
      
      console.log(this.vendorList);
      console.log(this.date);
      
    });
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
  }

  async addVendor(vendor:NgForm){
    let count = 0;
    if(this.vendorList !=null){
            for (var key in this.vendorList) { // fetching bookings for the users                   
              //this.book=this.dbBooking[key];
              count=this.vendorList[key].vendorId;
              
              count++;
              }
      }
      if(count == 0){
           count = 1;
      }
            this.db.list('/vendors').push({
              vendorId: count,
              title:vendor.value.title,
              vendorName: vendor.value.vendorName,
              vendorContact: vendor.value.contact,
              vendorAddress: vendor.value.address,
              reference: vendor.value.reference,
              balance:0,
              addedBy: this.username,
              addDate: this.date
            });
            this.vendorListSearch=[]; 
            alert("Successfully Added"); 
    

  }
  transform(vendors: any, searchText: any): any {
    if(searchText == null) return vendors;
    else if(searchText == "") return vendors;
    return vendors.filter(function(std){
      let balance:string =""+std.balance;
      return std.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
       std.vendorName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
       std.vendorContact.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || 
       balance.toLowerCase().indexOf(searchText.toLowerCase()) > -1 
       ;
    })
  }
  searchBox(){
    this.vendorListSearch=this.transform(this.vendorList,this.searchText)
  }

}
