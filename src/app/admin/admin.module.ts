import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "./admin-routing.module";
import { ArticlesComponent } from './article/articles/articles.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from "../shared/module/shared.module";
import { PaginationComponent } from "../shared/component/pagination/pagination.component";
import { ArticleComponent } from './article/article/article.component';


@NgModule({
  declarations: [
    ArticlesComponent,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    PaginationComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgGridModule,
    SharedModule
  ]
})
export class AdminModule { }
