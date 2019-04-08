import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role;
  username;
  constructor() {
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
   }

  ngOnInit() {
  }

}
