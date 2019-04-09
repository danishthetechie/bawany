import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import { CustomerServiceService } from '../customer-service.service' 
import * as firebase from 'firebase';

@Component({
  selector: 'app-make-bill',
  templateUrl: './make-bill.component.html',
  styleUrls: ['./make-bill.component.css']
})
export class MakeBillComponent implements OnInit {
  selected: string;
  allCustomers;
  custName = [];
  billNo;
  detailsArray = [];
  billDetailId = 0;
  currentDate;
  formatDate;
  role;
  username;
  totalAmount;
  
  constructor(public customerService:CustomerServiceService,public db: AngularFireDatabase) {

    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');

    //getting all customers
    db.list('/customers')
    .valueChanges()
    .subscribe(res => {
      this.allCustomers = res;
      for(let key in this.allCustomers){
        this.custName.push(this.allCustomers[key].customerId+"-"+this.allCustomers[key].customerName);
      }
    });
    this.currentDate = new Date();
    this.formatDate= this.currentDate.toISOString().substring(0, 10);
    
    
   }

  ngOnInit() {
  }


  getNewBillId(){
    let count= 0;
    for(let c in this.allCustomers){
      for(let b in this.allCustomers[c].bills ){
        count++;
      }
    }
    return ++count;
  }


  async createBill(custBill:NgForm){
    this.billNo=this.getNewBillId();
    if(custBill.value.customer != "" && custBill.value.qty != "" && custBill.value.product != "" && custBill.value.rate != ""){
      this.detailsArray.push({serial: this.billDetailId, product:custBill.value.product, quantity:custBill.value.qty,
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


  async finalBill(){
    let id="";
    let custId=0;
    let bills;
    //getting bill ID
    this.billNo=this.getNewBillId();

    if(this.detailsArray != null){
      bills = {billDate: this.formatDate, billid: this.billNo, totalAmount: this.totalAmount, billDetail: this.detailsArray};
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
      let key = this.getCustomerKey(custId); //get Customer Key
      firebase.database().ref('/customers/'+key).child("bills").push(bills); //push bill
    }
    location.reload();
  }


  getCustomerKey(id){
    let data$;
    this.db.database.ref('customers').orderByChild('customerId').equalTo(id).on("value", function(snapshot) {
      console.log(snapshot.val());
      
      snapshot.forEach(function(data) {
          console.log(data.key);
          data$ = data.key;
      });
    });
    return data$;
  }
  

}
