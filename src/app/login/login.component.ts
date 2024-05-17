import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppUser} from "../model/user.model";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userFormGroup!: FormGroup;
  errorMessage: any;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
  }


  ngOnInit() {
    this.userFormGroup = this.fb.group({
      username: this.fb.control(""), //default value is empty
      password: this.fb.control("") //default value is empty
    });
  }

  handleLogin() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next: (appUser: AppUser) => {
        this.authService.authenticateUser(appUser).subscribe({
          next : (date:boolean) => {
            this.router.navigate(["/admin"]);
          }
        });
      },
      error: (err: any) => {
        this.errorMessage = err;
      }
    });
  }


}
