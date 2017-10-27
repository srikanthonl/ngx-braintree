import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paymentFinished: boolean = false;
  paymentSucceded: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(value: boolean) {
    this.paymentSucceded = value;
    this.paymentFinished = true;
  }

}