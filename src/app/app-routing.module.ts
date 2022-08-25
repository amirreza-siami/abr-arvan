import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import {RegisterComponent} from "./auth/register/register.component";

const routes: Routes = [

    // register page
    { path: 'register', component: RegisterComponent },

    // home page is loginl
    { path: 'login', component: LoginComponent },
    { path: 'home', component: LoginComponent },
    { path: 'main', component: LoginComponent },

    // create 404 page
    { path: '**', component: LoginComponent },
    { path: '404', component: LoginComponent },
    { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
