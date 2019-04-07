import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {

  userLogin = {name: '', password: ''};
  constructor(private router: Router) { }

  ngOnInit() {
  }

  async login(loginForm:NgForm){
    if(loginForm.value.username != "" && loginForm.value.password != ""){
      this.userLogin.name = loginForm.value.username;
      this.userLogin.password = loginForm.value.password;
      this.router.navigate(['dashboard']);
    }
  }

}
