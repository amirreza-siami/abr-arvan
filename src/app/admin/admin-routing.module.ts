import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from "./article/articles/articles.component";
import { AdminComponent } from "./admin/admin.component";
import { ArticleComponent } from './article/article/article.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: ArticlesComponent,
            },
            {
                path: 'page/:pageIndex',
                component: ArticlesComponent,
            },
            {
                path: 'create',
                component: ArticleComponent,
            },
            {
                path: 'edit/:article',
                component: ArticleComponent,
            },
        ]

    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
