import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  constructor(private formBuilder: FormBuilder, public router:Router) { }

  ngOnInit(){

    this.signUpForm = this.formBuilder.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      email:['',Validators.required],
      UserName:['',Validators.required],
      pass:['',Validators.required]


    })
  }
  onSubmit(){
    this.submitted =true;

    if(this.signUpForm.invalid){
      return;
    }
    this.success = true;
    console.log(this.signUpForm.value);
    sessionStorage.setItem(this.signUpForm.value.UserName,JSON.stringify(this.signUpForm.value));
    console.log();
    this.signUpForm.reset();
    this.router.navigate(['login/']);
  }

}
