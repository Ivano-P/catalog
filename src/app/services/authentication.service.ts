import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users: AppUser[] = [];
  authenticatedUser:AppUser | undefined;
  constructor() {
    this.users.push({userID: UUID.UUID(), userName: "user1", password: "1234", roles: ["ADMIN, USER"]});
    this.users.push({userID: UUID.UUID(), userName: "user2", password: "1234", roles: ["USER"]});
    this.users.push({userID: UUID.UUID(), userName: "user3", password: "1234", roles: ["USER"]});
  }

  public login(userName: string, password: string):Observable<AppUser>{
    let appUser = this.users.find(u => u.userName === userName);
    if(!appUser) return throwError(()=>("User not found"));
    if(appUser.password !== password) return throwError(()=>("Invalid password"));
    return of(appUser);
  }

  public authenticateUser(appUser: AppUser):Observable<boolean>{
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({userName: appUser.userName, roles: appUser.roles, jwt: "JWT_TOKEN"}));
    return of(true);
  }

  public hasRole(role:string):boolean{
    return this.authenticatedUser!.roles.includes(role);
  }

  isAuthenticated():boolean{
    return this.authenticatedUser !== undefined;
  }
}
