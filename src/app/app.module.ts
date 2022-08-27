import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from "./shared/services/api.service";
import { SharedModule } from "./shared/module/shared.module";
import { RegisterComponent } from './auth/register/register.component';
import { JwtInterceptor } from "./shared/services/JwtInterceptor";
import { GridDelBtnComponent } from './shared/component/grid-del-btn/grid-del-btn.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GridDelBtnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
