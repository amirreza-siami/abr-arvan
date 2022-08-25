import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from "../shared/services/api.service";

@Injectable()
export class AuthService {

  userApiUrl: string = "users/";

  constructor(
      private apiService: ApiService
  ) { }

  login(email: string, password: string): Observable<any>{
    return this.apiService.post(this.userApiUrl + "Login", {email: email, password: password}, false)
  }

}
