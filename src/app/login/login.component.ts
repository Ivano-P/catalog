import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userFormGroup!: FormGroup;
  constructor(private fb: FormBuilder){
  }

  ngOnInit() {
    this.userFormGroup=this.fb.group({
      username: this.fb.control(""), //default value is empty
      password: this.fb.control("") //default value is empty
    });
  }

  handleLogin() {

  }
}
