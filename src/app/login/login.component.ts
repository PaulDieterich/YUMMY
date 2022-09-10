import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {


  @Input() userName: string;
  @Input() password: string;
  constructor() { }

  ngOnInit() {}

  login() {
    
    throw new Error('Method not implemented.');
  }

}
