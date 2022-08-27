import { Component, OnInit } from '@angular/core';
import { ColDef, GetRowIdFunc, GetRowIdParams, GridApi, RowDataTransaction, ValueFormatterParams } from 'ag-grid-community';
import { ArticlesService } from "../articles.service";
import { ArticleApiModel, ArticleAuthorModel, ArticleModel } from "../article-model";
import { Router } from "@angular/router";
import { GridDelBtnComponent } from "../../../shared/component/grid-del-btn/grid-del-btn.component";
import { ToastrService } from 'ngx-toastr';
import { GridEditBtnComponent } from 'src/app/shared/component/grid-edit-btn/grid-edit-btn.component';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

    columnDefs: ColDef[] = [
        {
            field: 'title',
            headerName: 'Title',
            width: 400,
        },
        {
            field: 'author.username',
            headerName: 'Author',
            width: 200
        },
        {
            field: 'tagList',
            headerName: 'Tags',
            width: 300,
            valueFormatter: (params: ValueFormatterParams) => {
                let result: string = "";
                return params.value.join(",")
            }
        },
        {
            field: 'body',
            headerName: 'Excerpt',
            width: 200
        },
        {
            field: 'createdAt',
            headerName: 'Created',
            width: 200,
        },
        {
            field: 'delete',
            headerName: '',
            width: 100,
            cellRenderer: GridDelBtnComponent,
        },
        {
            field: 'edit',
            headerName: '',
            width: 100,
            cellRenderer: GridEditBtnComponent,
            cellRendererParams: {
                clicked: (params: any) => {
                    console.log('%carticles.component.ts line:70 params', 'color: #007acc;', params);
                    // params.api?.applyTransactionAsync({ remove: [params.data] });
                    // this.articlesService.delArticles(params.data).subscribe((result) => {
                    //     this.toastr.success("Delete success");
                    // }, (error) => {
                    //     this.toastr.error("Delete failed.")
                    // })
                },
            },
        },
    ];
    articles: ArticleModel[] = new Array<ArticleModel>();
    articlesCount: number = 0;
    gridApi: GridApi = new GridApi;
    loading: boolean = false;
    public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.slug;

    constructor(
        private articlesService: ArticlesService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getArticles();
    }

    onGridReady(event: any) {
        this.gridApi = event.api;
    }

    getArticles(): void {
        this.loading = true;
        this.articlesService.getArticles().subscribe((result: ArticleApiModel) => {
            this.articles = result.articles;
            this.articlesCount = result.articlesCount;
            this.loading = false;
        })
    }

    onChangePagination(event: any): void {
        this.router.navigate(['/articles/page/' + event.pageIndex])
    }

}
