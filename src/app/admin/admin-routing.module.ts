import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from "./article/articles/articles.component";
import { AdminComponent } from "./admin/admin.component";
import { NewArticleComponent } from "./article/new-article/new-article.component";

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
                component: NewArticleComponent,
            },
            {
                path: 'edit/:article',
                component: NewArticleComponent,
            },
        ]

    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
