export interface ArticleApiModel {
    articles: ArticleModel[];
    articlesCount: number;
}

export interface ArticleModel {
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
    author: ArticleAuthorModel;
    delete?: string;
    update?: string;
}

export interface ArticleAuthorModel {
    bio?: string;
    following: boolean;
    image: string;
    username: string;
}

export interface AddArticleApiModel {
    title: string | null;
    description?: string | null;
    body?: string | null;
    tagList: string[];
}

export interface TagsApiModel {
    tags: string[];
}
export interface TagsModel {
    text: string;
    active: boolean;
}