import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role;
  username;
  constructor() { 
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
  }

}
