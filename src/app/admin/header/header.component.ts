import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../auth/user-model";
import {StorageService} from "../../shared/services/storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
    providers:[StorageService]
})
export class HeaderComponent implements OnInit {

    user: UserModel | null = null;
    storageUserInfoKey: string = "user";

  constructor(
      private storageService: StorageService,
      private router: Router,
      private toastService: ToastrService,
  ) {
      this.getUserName();
  }

  ngOnInit(): void {
  }

  getUserName() {
      this.storageService.getItem(this.storageUserInfoKey).subscribe((result) => {
          this.user = result;
          if(this.user && !this.user.token) this.router.navigate(['/login']);
      })
  }

    onCliCkLogout(){
      this.storageService.delItem(this.storageUserInfoKey).subscribe((result) => {
          if(result) {
              this.toastService.success("Logout success");
              this.router.navigate(['/login']);
          }
      })
    }

}
