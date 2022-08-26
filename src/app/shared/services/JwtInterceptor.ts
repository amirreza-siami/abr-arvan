import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModel} from "../../auth/user-model";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userString: string | null = localStorage.getItem("user");
        if(userString){
        let user: UserModel = JSON.parse(userString);
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}
