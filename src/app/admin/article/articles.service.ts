import { Injectable } from '@angular/core';
import { ApiService } from "../../shared/services/api.service";
import { Observable } from 'rxjs';
import { AddArticleApiModel, ArticleModel, TagsApiModel } from "./article-model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  articlesControllerUrl = "articles/";
  tagsControllerUrl = "tags/";

  constructor(
    private apiService: ApiService
  ) { }

  getArticles(): Observable<any> {
    return this.apiService.get(this.articlesControllerUrl)
  }

  getArticle(articleSlug: string): Observable<any> {
    return this.apiService.get(this.articlesControllerUrl + articleSlug)
  }

  addArticles(article: AddArticleApiModel): Observable<any> {
    return this.apiService.post(this.articlesControllerUrl, { article: article })
  }

  updateArticles(article: AddArticleApiModel, articleSlug: string): Observable<any> {
    return this.apiService.put(this.articlesControllerUrl + articleSlug, { article: article })
  }

  delArticles(article: ArticleModel): Observable<any> {
    return this.apiService.delete(this.articlesControllerUrl + article.slug, {})
  }

  getAllTags(): Observable<TagsApiModel> {
    return this.apiService.get(this.tagsControllerUrl)
  }

}
