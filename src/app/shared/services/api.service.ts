import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastService } from '../component/toaster/toast-service.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    storageUserInfoKey: string = 'user-jwt';

    constructor(
        private http: HttpClient,
        private toastService: ToastService,
        private router: Router,
    ) { }

    post(url: string, parameters?: {}[] | {}, checkIsAuthenticated: boolean = true): Observable<any> {

        if (checkIsAuthenticated) {
            let userInfoString: string | null = localStorage.getItem(this.storageUserInfoKey);
            if (!userInfoString) return throwError(this.router.navigate(['/login', { rdHref: this.router.url }]));
        }

        return this.http.post<any>(environment.apiUrl + url, parameters, this.httpOptions).pipe(
            catchError(resultError => { return this.catchErrorHandler(resultError); })
        );
    }

    catchErrorHandler(resultError: any) {

        if (resultError.status === 401) {
            this.toastService.error("You do not have the required access");
            this.router.navigate(['/login', { rdHref: this.router.url }]);
        }

        if (resultError.status === 404) {
            this.toastService.error("An error occurred");
            this.router.navigate(['/404', { rdHref: this.router.url }]);
        }

        if (resultError.status === 500) {
            this.toastService.error("An error occurred");
        }

        return throwError(resultError["error"]);
    }
}
