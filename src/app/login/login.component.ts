import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  success: string;
  flagsCheck = false;
  message = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    //get the return url from the route params or default to '/' which should be home
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    //show success message for registration
    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Registration successful';
    }
  }

  //super scuffed login check that just iterates through the array and checks usernames and passwords
  checkLogin(){
    this.flagsCheck = true;
    for(let i = 0; i < this.userService.UserArray.length; i++){
      if(this.loginForm.controls['username'].value === this.userService.UserArray[i].username
      && this.loginForm.controls['password'].value === this.userService.UserArray[i].password){
        this.message = "Login Successful"
      }
      else{
        this.message = "Username or Password is incorrect"
      }

    }
    this.loginForm.reset();

  }


  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //reset the alerts when submitted
    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
