import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticlesService } from "../articles.service";
import { TagsApiModel, TagsModel, AddArticleApiModel, ArticleModel } from "../article-model";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: 'app-new-article',
    templateUrl: './new-article.component.html',
    styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

    loading: boolean = false;
    tags: TagsModel[] = new Array<TagsModel>();
    articleFormControl = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('',),
        body: new FormControl('', [Validators.required]),
        tags: new FormArray([]),
    });

    @ViewChild('newTagInput', { static: true }) newTagInput: ElementRef | undefined;

    constructor(
        private articlesService: ArticlesService,
        private toastService: ToastrService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {

        this.getAllTags();

    }

    ngOnInit(): void {

        this.activatedRoute.params.forEach((params: Params) => {
            this.loading = true;
            this.getArticle(params['article']);
        });

    }

    addNewTag() {
        if (this.newTagInput && this.newTagInput.nativeElement && this.newTagInput.nativeElement.value) {
            this.tags.push({
                text: this.newTagInput.nativeElement.value,
                active: true
            })

            this.newTagInput.nativeElement.value = "";
            this.reSortTags();
        }
    }

    getAllTags() {
        this.loading = true;
        this.articlesService.getAllTags().subscribe((result: TagsApiModel) => {
            result.tags.forEach(tag => {
                this.tags.push({
                    text: tag,
                    active: false
                })
            });
            this.reSortTags();
            this.loading = false;
        });
    }

    reSortTags() {
        this.tags.sort((a, b) => a.text.localeCompare(b.text))
    }

    onSubmitArticleForm() {
        if (!this.articleFormControl.touched || !this.articleFormControl.valid) return;
        let articleToAdd: AddArticleApiModel = {
            title: this.articleFormControl.controls.title.value,
            description: this.articleFormControl.controls.description.value,
            body: this.articleFormControl.controls.body.value,
            tagList: new Array<string>(),
        }

        this.tags.forEach((i) => {
            if (i.active) articleToAdd.tagList.push(i.text);
        });

        this.articlesService.addArticles(articleToAdd).subscribe((result: any) => {
            this.toastService.success("Well done! Article created successfuly");
            this.router.navigate(["articles"])
        });
    }

    checkTag(tag: TagsModel, event: any): void {
        if (!event.target && typeof event.target.checked === "undefined") return;
        tag.active = event.target.checked;
    }

    getArticle(articleSlug: string) {
        this.articlesService.getArticle(articleSlug).subscribe((result: { article: ArticleModel }) => {
            this.articleFormControl.patchValue({
                title: result.article.title,
                description: result.article.description,
                body: result.article.body
            });
        });
    }

}
