import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from "ngx-loading";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({}),
      BrowserAnimationsModule, // required animations module
      ToastrModule.forRoot(), // ToastrModule added
  ],
    exports: [
        NgxLoadingModule,
    ]
})
export class SharedModule { }
