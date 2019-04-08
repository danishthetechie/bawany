import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  allUsers;
  list:Observable<any[]>;
  allRoles = [];
  roles = {roleId: '', roleTitle: ''};

  constructor(private router: Router,public db: AngularFireDatabase) {
    //getting roles
    db.list('/role')
    .valueChanges()
    .subscribe(res => {
      this.allRoles.push(res);
    });
    console.log(this.allRoles);

    //getting users
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

  async registerRole(registerRole:NgForm){
    if(registerRole.value.roleid != "" && registerRole.value.title != ""){
      this.db.list('/role').push({
        id: registerRole.value.roleid,
        roleTitle: registerRole.value.roletitle
       });
       alert("Successfully registered");
    }
    else{
      alert("Your field is empty");
    }
  }

  async registerUser(regUser:NgForm){
    let count = 0;
    for (var key in this.allUsers) {
      count=this.allUsers[key].userId;
      count++;
}

    if(regUser.value.username != "" && regUser.value.email != "" && regUser.value.password != "" && regUser.value.contact != ""){
      if(count == 0){
        count = 1;
      }
      this.db.list('/users').push({
        userId: count,
        username: regUser.value.username,
        email: regUser.value.email,
        password: regUser.value.password,
        contact: regUser.value.contact,
        role: regUser.value.selRole
       });
       alert("Successfully registered");
    }
    else{
      alert("Your field is empty");
    }
  }

}
