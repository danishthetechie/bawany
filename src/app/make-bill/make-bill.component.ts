import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-make-bill',
  templateUrl: './make-bill.component.html',
  styleUrls: ['./make-bill.component.css']
})
export class MakeBillComponent implements OnInit {
  selected: string;
  allCustomers = [];
  allBills = [];

  billNo;
  detailsArray = [];
  billDetailId = 0;
  currentDate;
  formatDate;
  role;
  username;
  totalAmount;
  
  constructor(public db: AngularFireDatabase) {
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');

    //getting all customers
    db.list('/customers')
    .valueChanges()
    .subscribe(res => {
      this.allCustomers.push(res);
    });

    //getting all bills
    db.list('/customer-bills')
    .valueChanges()
    .subscribe(res => {
      this.allBills.push(res);
    });

    //creating bill details
    this.billNo = this.getNewBillId();
    this.currentDate = new Date();
    this.formatDate= this.currentDate.toISOString().substring(0, 10);
    
    
   }

  ngOnInit() {
  }


  getNewBillId(){
    let count= 1;
    if(this.allBills != null){
      for (var key in this.allBills) {
        count++;
      }
    }
    return count;
  }


  async createBill(custBill:NgForm){

    if(custBill.value.customer != "" && custBill.value.qty != "" && custBill.value.product != "" && custBill.value.rate != ""){
      this.detailsArray.push({serial: this.billDetailId, product:custBill.value.product, qty:custBill.value.qty,
                             rate:custBill.value.rate, subtotal:(custBill.value.qty * custBill.value.rate)});
      this.billDetailId++;
      console.log(this.detailsArray);
      this.totalAmount = 0;
      for(let d of this.detailsArray){
        this.totalAmount += d.subtotal
      }
    }
    else{
      alert("Field Missing");
    }
  }

  async deleteRow(id){
    let valueCount:number =0;
    let detailID:number =0;
    
    this.detailsArray = this.detailsArray.filter(function( obj ) {
      detailID=obj. serial
      return obj.serial !== id;
    });
    this.totalAmount = 0;
      for(let d of this.detailsArray){
        this.totalAmount += d.subtotal
      }
  }

}
