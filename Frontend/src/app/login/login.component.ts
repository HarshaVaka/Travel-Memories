import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Loginform:FormGroup;
  isFormSubmitted=false;


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.Loginform=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    this.isFormSubmitted=true;
    const formData={
      email:this.Loginform.value.email,
      password:this.Loginform.value.password
    }
    if (this.Loginform.valid) {
      this.http.post('http://localhost:3001/api/auth/login',formData)
      .subscribe({
        next:(response) =>{
          console.log("Authentication Success",response);
        },
        error:(err)=>{
          console.log("Authentication Failed",err);
        }
      })
    }
  }

  //check if field is invalid
  isFieldInvalid(fieldName: string):boolean {
    const formField = this.Loginform.get(fieldName);
    return formField.touched && formField.invalid;
  }

}
