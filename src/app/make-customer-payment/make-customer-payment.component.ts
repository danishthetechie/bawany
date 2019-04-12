import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import { CustomerServiceService } from '../customer-service.service' 
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-make-customer-payment',
  templateUrl: './make-customer-payment.component.html',
  styleUrls: ['./make-customer-payment.component.css']
})
export class MakeCustomerPaymentComponent implements OnInit {

  //For Login Check
  role;
  username;

  //For TypeHead
  allCustomers;
  custName = [];  

  //For Current Date
  currentDate;
  formatDate;

  //For Payment Id
  paymentId;

  //Typehead Select
  selected;

  //Bill details
  billsArray = [];

  //For Fields
  totalAmount=0;
  remainingAmount=0;
  paymentNo=0;
  amountPaid=0;
  //customer
  customerBalance;

  constructor(public datepipe: DatePipe, private router: Router,public customerService:CustomerServiceService,public db: AngularFireDatabase) { 
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

     //get Current Date
     this.currentDate = new Date();
     this.formatDate =this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

  getNewPaymentId(){
    let count= 0;
    for(let c in this.allCustomers){
      if(this.allCustomers[c].payments != null){
          for(let b in this.allCustomers[c].payments ){
            count++;
          }
      }
    }
    return ++count;
  }

  
  getBalance(){
    this.billsArray=[];
    console.log(this.selected);
      //getting Paymet ID
      this.paymentNo=this. getNewPaymentId();
    
      //get Customer Id
      let customerId=this.getCustomerId();
      console.log(customerId);
      //getBalance and get Bill Details
      for(let c in this.allCustomers){
        if(this.allCustomers[c].customerId == customerId){
          for(let b in this.allCustomers[c].bills ){
            this.billsArray.push({billDate: this.allCustomers[c].bills[b].billDate,
               billid: this.allCustomers[c].bills[b].billid, 
               totalAmount:  this.allCustomers[c].bills[b].totalAmount, 
               billDetail:  this.allCustomers[c].bills[b].billDetail
              });
          }
          this.totalAmount=this.allCustomers[c].balance;
          
        }
      }
      console.log(this.billsArray);

        
  }

  //Pyment Submit
  createPayment(payment:NgForm){
    let payments={
      payId:this.getNewPaymentId(),
      payDate:this.formatDate,
      payAmount:payment.value.amountPaid,
      chequeNo:payment.value.chequeNo,
      bank:payment.value.bank,
      chequeDate:payment.value.chequeDate,
      payDetails:payment.value.payDetails
    };
   
    let id= this.getCustomerId();
    let custId= +id; //parse into Int
    let key = this.getCustomerKey(custId); //get Customer Key
    firebase.database().ref('/customers/'+key).child("payments").push(payments); //push bill
    //this.customerBalance =this.getBalance();
    //console.log(this.customerBalance);
    this.totalAmount -= payment.value.amountPaid;
    //console.log(this.customerBalance);
    this.db.object('customers/' + key).update({balance: this.totalAmount});
    //alert(payment.value.amountRemain);
    this.router.navigate(['dashboard']);

    
  }

  //get Customer ID from TypeHead
  getCustomerId(){
    let id=0;  
    for(let i=0;i<this.selected.length;i++){
        if(this.selected[i]!= '-'){
          id+=this.selected[i];
        }
        else if(this.selected[i]== '-'){
          break;
        }
      }
    return id;
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
    
    //get 
    getRemainingAmount(amountPaid){
    
      this.remainingAmount=this.totalAmount-amountPaid;

    }
}
