import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
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
    storageUserInfoKey: string = 'user';

    constructor(
        private http: HttpClient,
        private toastService: ToastrService,
        private router: Router,
    ) { }

    post(url: string, parameters?: {}[] | {}, checkIsAuthenticated: boolean = true): Observable<any> {

        if (checkIsAuthenticated) {
            let userInfoString: string | null = localStorage.getItem(this.storageUserInfoKey);
            if (!userInfoString || !JSON.parse(userInfoString)['token']) return throwError(this.router.navigate(['/login', { rdHref: this.router.url }]));
        }

        return this.http.post<any>(environment.apiUrl + url, parameters, this.httpOptions).pipe(
            catchError(resultError => { return this.catchErrorHandler(resultError); })
        );
    }

    put(url: string, parameters: {}[] | {}, checkIsAuthenticated: boolean = true): Observable<any> {

        if (checkIsAuthenticated) {
            let userInfoString: string | null = localStorage.getItem(this.storageUserInfoKey);
            if (!userInfoString || !JSON.parse(userInfoString)['token']) return throwError(this.router.navigate(['/login', { rdHref: this.router.url }]));
        }

        return this.http.put<any>(environment.apiUrl + url, parameters, this.httpOptions).pipe(
            catchError(resultError => { return this.catchErrorHandler(resultError); })
        );
    }

    get(url: string, checkIsAuthenticated: boolean = true): Observable<any> {

        if (checkIsAuthenticated) {
            let userInfoString: string | null = localStorage.getItem(this.storageUserInfoKey);
            if (!userInfoString || !JSON.parse(userInfoString)['token']) return throwError(this.router.navigate(['/login', { rdHref: this.router.url }]));
        }

        return this.http.get<any>(environment.apiUrl + url, this.httpOptions).pipe(
            catchError(resultError => { return this.catchErrorHandler(resultError); })
        );
    }

    delete(url: string, parameters: {}[] | {}): Observable<any> {

        let newHttpOption = {
            headers: this.httpOptions.headers,
            body: parameters
        };
        return this.http.delete<any>(environment.apiUrl + url, newHttpOption).pipe(
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
