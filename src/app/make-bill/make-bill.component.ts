import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-bill',
  templateUrl: './make-bill.component.html',
  styleUrls: ['./make-bill.component.css']
})
export class MakeBillComponent implements OnInit {
  role;
  username;
  constructor() {
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
   }

  ngOnInit() {
  }

}
