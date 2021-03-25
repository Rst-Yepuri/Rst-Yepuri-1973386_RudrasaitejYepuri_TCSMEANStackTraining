import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  constructor(private formBuilder: FormBuilder, public router:Router) { }

  ngOnInit(){

    this.loginForm = this.formBuilder.group({
      UserName:['',Validators.required],
      pass:['',Validators.required]


    })
  }
  onSubmit(){
    this.submitted =true;

    if(this.loginForm.invalid){
      return;
    }
    if(JSON.parse(sessionStorage.getItem(this.loginForm.value.UserName)!).pass == this.loginForm.value.pass){
      sessionStorage.setItem("token", "123");
      this.success = true;
      this.router.navigate(["dashboard"]);
    }

  }

}
