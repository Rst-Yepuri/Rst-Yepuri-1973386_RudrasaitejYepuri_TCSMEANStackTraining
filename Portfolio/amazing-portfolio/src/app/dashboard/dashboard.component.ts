import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  contactRef = new FormGroup({
    contactName:new FormControl(),
    phoneNum:new FormControl()
  })
  contacts:Array<Array<string>> = new Array(); 
  constructor(private formBuilder: FormBuilder, public router:Router,) { 



  }

  ngOnInit(): void {
  

  }
  saveContactInfo(){
    this.contacts.push([this.contactRef.value['contactName'],this.contactRef.value['phoneNum']]);
    this.contactRef.reset();

  }

  logout(){
    sessionStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
}
