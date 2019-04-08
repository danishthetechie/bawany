import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {

  list:Observable<any[]>;
  allUsers;
  user;
  userLogin = {name: '', password: ''};
  constructor(private router: Router,public db: AngularFireDatabase) {
    this.allUsers = db.list('/users')
    .valueChanges()
    .subscribe(res => {
      console.log(res)//should give you the array of percentage. 
      this.allUsers = res;
    });
    console.log(this.allUsers);
   }

  ngOnInit() {
  }

  async login(loginForm:NgForm){
    if(loginForm.value.username != "" && loginForm.value.password != ""){
      for (var key in this.allUsers){
        if (this.allUsers[key].username == loginForm.value.username && this.allUsers[key].password == loginForm.value.password){
          localStorage.setItem('username', loginForm.value.username);
          localStorage.setItem('role', this.allUsers[key].role);
          this.router.navigate(['dashboard']);
        }
      }
  }
  else{
    alert("Incorrect Username Or Password.");
  }

  }
}