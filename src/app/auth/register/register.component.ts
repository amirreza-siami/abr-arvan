import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../auth.service";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

    registerFormControl = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });
    loading: boolean = false;

  constructor(
      private authService: AuthService,
      private toastService: ToastrService,
      private router: Router,
  ) { }

  ngOnInit(): void {
  }

    onSubmitRegisterForm(){
        if(!this.registerFormControl.touched || !this.registerFormControl.valid) return;
        if(!this.registerFormControl.controls.username.value || !this.registerFormControl.controls.email.value || !this.registerFormControl.controls.password.value) return;
        this.loading = true;

        this.authService.registerUser(this.registerFormControl.controls.username.value, this.registerFormControl.controls.email.value, this.registerFormControl.controls.password.value).subscribe((result) => {
            if(this.authService.saveUserInfo(result["user"])) this.router.navigate(['/dashboard']);
            this.loading = false;
        }, (error) => {

            if(error.errors['email']){
                error.errors['email'].forEach((e: string) => {
                    this.toastService.error("Email " + e);
                });
            }

            if(error.errors['username']){
                error.errors['username'].forEach((e: string) => {
                    this.toastService.error("User Name " + e);
                });
            }

            this.loading = false;
        });
        console.log(this.registerFormControl);
    }

}
