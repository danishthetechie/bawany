import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { NgForm } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.css']
})
export class CustomerLedgerComponent implements OnInit {
  role;
  username;
  allCustomers;
  selected: string;
  custName = [];
  currentCustomer;
  ledger:any = [];

  constructor(public customerService:CustomerServiceService,public db: AngularFireDatabase) {
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');

    //fetching customers
    db.list('/customers')
    .valueChanges()
    .subscribe(res => {
      this.allCustomers = res;
      for(let key in this.allCustomers){
        this.custName.push(this.allCustomers[key].customerId+"-"+this.allCustomers[key].customerName);
      }
    });

  }

  async searchCustomer(searchCustomerForm:NgForm){
    this.ledger= [];
    let id="";
    let custId=0;
    if(searchCustomerForm.value.customer != ""){
      //get ID of Customer
      //get Customer ID
      for(let i=0;i<this.selected.length;i++){
        if(this.selected[i]!= '-'){
          id+=this.selected[i];
        }
        else if(this.selected[i]== '-'){
          break;
        }
      }
      custId= +id; //parse into Int
      for(let cust in this.allCustomers){
        console.log(this.allCustomers[cust].customerId+ " != " + custId);
        if(this.allCustomers[cust].customerId == custId){
          console.log(this.allCustomers[cust].customerId+ " == " + custId);
          console.log(this.allCustomers[cust].bills);
          console.log(this.allCustomers[cust].payments);
          for(let b in this.allCustomers[cust].bills){
            console.log(this.allCustomers[cust].bills[b].billDate);
            this.ledger.push({ date: this.allCustomers[cust].bills[b].billDate,
              billNo: this.allCustomers[cust].bills[b].billid,
              details: "", 
              credit: this.allCustomers[cust].bills[b].totalAmount, 
              debit:""});    
          }
          console.log(this.ledger);
          for(let p in this.allCustomers[cust].payments){
            this.ledger.push({ date: this.allCustomers[cust].payments[p].payDate, 
              billNo: "",
              details: "Cheque: "+this.allCustomers[cust].payments[p].chequeNo
                       + " | Date: " + this.allCustomers[cust].payments[p].chequeDate + " | Bank: " + this.allCustomers[cust].payments[p].bank, 
              credit: "", 
              debit:this.allCustomers[cust].payments[p].payAmount});    
          }
        }
      }
      console.log(this.ledger);
          this.ledger.sort((a, b) => {

            return (b.date) - (a.date);
            //return new Date(b.date)- new Date(a.date);

          });
    }
  }


  getCustomer(id){
    let data$;
    this.db.database.ref('customers').orderByChild('customerId').equalTo(id).on("value", function(snapshot) {
      data$ = snapshot.val();
      //console.log(snapshot.val());
      // snapshot.forEach(function(data) {
      //     //console.log(data.key);
      //     data$ = data.key;
      // });
    });
    return data$;
  }

  ngOnInit() {
  }

}
