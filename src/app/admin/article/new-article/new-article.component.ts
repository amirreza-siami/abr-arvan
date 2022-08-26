import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ArticlesService} from "../articles.service";
import {TagsApiModel, TagsModel, AddArticleApiModel} from "../article-model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

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
        description: new FormControl('', ),
        body: new FormControl('', [Validators.required]),
        tags: new FormArray([]),
    });

    @ViewChild('newTagInput', {static: true}) newTagInput: ElementRef | undefined;

  constructor(
      private articlesService: ArticlesService
  ) {

      this.getAllTags();

  }

  ngOnInit(): void {
  }

    addNewTag(){
        if(this.newTagInput && this.newTagInput.nativeElement && this.newTagInput.nativeElement.value){
        this.tags.push({
            text: this.newTagInput.nativeElement.value,
            active: true
        })

            this.newTagInput.nativeElement.value = "";
        this.reSortTags();
        }
    }

    getAllTags(){
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

    reSortTags(){
        this.tags.sort((a, b) => a.text.localeCompare(b.text))
    }

    onSubmitArticleForm(){
        if(!this.articleFormControl.touched || !this.articleFormControl.valid) return;
        let articleToAdd: AddArticleApiModel = {
            title: this.articleFormControl.controls.title.value,
            description: this.articleFormControl.controls.description.value,
            body: this.articleFormControl.controls.body.value,
            tagList: new Array<string>(),
        }

        this.tags.forEach((i) => {
            if(i.active) articleToAdd.tagList.push(i.text);
        });

        this.articlesService.addArticles(articleToAdd).subscribe((result: any) => {
            console.log(result)
        });
    }

    checkTag(tag: TagsModel, event: any): void{
      if(!event.target && typeof event.target.checked === "undefined") return;
        tag.active = event.target.checked;
    }

}
