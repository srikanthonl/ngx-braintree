import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var braintree: any;

@Component({
  selector: 'app-dropin',
  templateUrl: './dropin.component.html',
  styleUrls: ['./dropin.component.css']
})
export class DropinComponent implements OnInit {

  @Input() clientToken: string;
  @Output() pay: EventEmitter<any> = new EventEmitter<any>();
  interval: any;
  instance: any;

  constructor() { }

  ngOnInit() {
    this.interval = setInterval(() => { this.createDropin(); }, 0);
  }

  createDropin() {
    if (typeof braintree !== 'undefined') {
      braintree.dropin.create({
        authorization: this.clientToken,
        container: '#dropin-container'
      }, (createErr, instance) => {
        this.instance = instance;
      });
      clearInterval(this.interval);
    }
  }

  handlePay() {
    this.pay.emit(this.instance);
  }

}
