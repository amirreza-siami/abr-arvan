import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from "ngx-loading";
import { ToastrModule } from 'ngx-toastr';
import {LoadingComponent} from "../component/loading/loading.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({}),
      ToastrModule.forRoot(), // ToastrModule added
      FormsModule,
      ReactiveFormsModule
  ],
    exports: [
        NgxLoadingModule,
        LoadingComponent,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
