import { Component } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})

export class AdminTemplateComponent {
  constructor(public authService : AuthenticationService, private router : Router) {}

    ngOnInit() {
  }
  handleLogout(){
    this.authService.logout().subscribe({
      next: (data:boolean) => {
        this.router.navigateByUrl("/login");
      }
    });
  }

}
