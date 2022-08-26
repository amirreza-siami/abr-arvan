import { Injectable } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import { Observable } from 'rxjs';
import {AddArticleApiModel, TagsApiModel} from "./article-model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  articlesControllerUrl = "articles/";
  tagsControllerUrl = "tags/";

  constructor(
      private apiService: ApiService
  ) { }

  getArticles(): Observable<any>{
    return this.apiService.get(this.articlesControllerUrl)
  }

  addArticles(article: AddArticleApiModel): Observable<any>{
    return this.apiService.post(this.articlesControllerUrl, {article: article})
  }

    getAllTags(): Observable<TagsApiModel>{
        return this.apiService.get(this.tagsControllerUrl)
    }

}
