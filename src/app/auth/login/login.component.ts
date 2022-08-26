import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginFormControl = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
  });
  loading: boolean = false;

  constructor(
      private authService: AuthService,
      private toastService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmitLoginForm(): void{
      if(!this.loginFormControl.touched || !this.loginFormControl.valid) return;
      if(!this.loginFormControl.controls.email.value || !this.loginFormControl.controls.password.value) return;
      this.loading = true;

      this.authService.login(this.loginFormControl.controls.email.value, this.loginFormControl.controls.password.value).subscribe((result) => {
          this.loading = false;
      }, (error) => {
          this.loading = false;
          this.toastService.error("Login Failed!  User name and/or Password is invalid")
      });
  }

}
