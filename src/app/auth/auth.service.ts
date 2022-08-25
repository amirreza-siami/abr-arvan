import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from "../shared/services/api.service";
import {LoginModel, RegisterModel, UserModel} from "./user-model";

@Injectable()
export class AuthService {

  userApiUrl: string = "users/";
  storageUserInfoKey: string = "user";

  constructor(
      private apiService: ApiService,
  ) { }

  login(email: string, password: string): Observable<any>{
    const params: LoginModel = {email: email, password: password};
    return this.apiService.post(this.userApiUrl + "Login", {user: params}, false);
  }

    registerUser(username: string, email: string, password: string): Observable<any>{
        const params: RegisterModel = {username: username, email: email, password: password};
        return this.apiService.post(this.userApiUrl + "", {user: params}, false)
    }

    saveUserInfo(result: UserModel): boolean{
      localStorage.setItem(this.storageUserInfoKey, JSON.stringify(result));
      return true;
    }

}
