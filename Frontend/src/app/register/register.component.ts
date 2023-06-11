import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerform:FormGroup;
  isFormSubmitted=false;


  constructor(
    private http:HttpClient,
    private router:Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.registerform=new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required)
    }, {
      validators: this.passwordMatchValidator
    });
  }

  onSubmit(){
    this.isFormSubmitted=true;
    const formData = {
      name:this.registerform.value.name,
      email: this.registerform.value.email,
      password: this.registerform.value.password,
    };
    if (this.registerform.valid) {
      this.http.post('http://localhost:3001/api/auth/register',formData)
      .subscribe({
        next:(response) =>{
          this.router.navigate(['/login']);
          console.log("Authentication Success",response);
        },
        error:(err)=>{
          this.registerform.reset();
          console.log("Authentication Failed",err);
        }
      })
    }
  }

  //check if field is invalid
  isFieldInvalid(fieldName: string):boolean {
    const formField = this.registerform.get(fieldName);
    return formField.touched && formField.invalid;
  }


    //Check if both Password fields are same
  // private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const passwordControl = control.get('password');
  //   const confirmPasswordControl = control.get('confirmPassword');
  //   if (passwordControl.value !== confirmPasswordControl.value) {
  //     confirmPasswordControl.setErrors({ passwordMismatch: true });
  //   } else {
  //     confirmPasswordControl.setErrors(null);
  //   }
  // };

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');
    if (passwordControl.value !== confirmPasswordControl.value) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
