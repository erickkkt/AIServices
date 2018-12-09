import { fetchApi, fetchLogin, fetchImageApi } from './helper';
import { BaseUrl } from './base.url';
import { ServiceUrl } from './service.url';
import { AuthUrl } from './auth.url';

/* Articles */
export function apiGetArticles(callback, errorCallback) {
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL;
    fetchApi(url, 'GET', undefined, callback, errorCallback);
}

export function apiGetArticlesByUser(userModel, callback, errorCallback){
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL + 'GetArticlesByUser';
    fetchApi(url, 'POST', userModel, callback, errorCallback);
}

export function apiGetArticlesByCategory(category, callback, errorCallback){
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL + 'GetArticlesByCategory/' + category;
    fetchApi(url, 'GET', undefined, callback, errorCallback);
}

export function apiGetArticlesByUserPaging(page, userModel, callback, errorCallback){
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL + 'GetArticlesByUser/' + page;
    fetchApi(url, 'POST', userModel, callback, errorCallback);
}

export function apiGetArticlesByCategoryPaging(category, page, callback, errorCallback){
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL + 'GetArticlesByCategory/' + category + '/' + page;
    fetchApi(url, 'GET', undefined, callback, errorCallback);
}

export function apiSearchArticlesPaging(search, page, callback, errorCallback){
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL + 'SearchArticles/' + search + '/' + page;
    fetchApi(url, 'GET', undefined, callback, errorCallback);
}

export function apiGetArticlesPaging(page, callback, errorCallback){
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL + 'GetArticlesPaging/' + page;
    fetchApi(url, 'GET', undefined, callback, errorCallback);
}

export function apiGetArticleById(articleId, callback, errorCallback) {
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL + articleId;
    fetchApi(url, 'GET', undefined, callback, errorCallback);
}

export function apiCreateArticle(article, callback, errorCallback) {
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL;
    fetchApi(url, 'POST', article, callback, errorCallback);
}

export function apiUploadPhoto(articleImage, callback, errorCallback) {
    var url = BaseUrl.BASE_URL + ServiceUrl.ARTICLE_URL + 'UploadPhoto';
    fetchImageApi(url, 'POST', articleImage, callback, errorCallback);
}

/* Categories */
export function apiGetCategories(callback, errorCallback) {
    var url = BaseUrl.BASE_URL + ServiceUrl.CATEGORY_URL;
    fetchApi(url, 'GET', undefined, callback, errorCallback);
}

/* Account */
export function apiRegisterAccount(registerModel, callback, errorCallback){
    var url = BaseUrl.AUTH_URL + AuthUrl.REGISTER_URL;
    fetchApi(url, 'POST', registerModel, callback, errorCallback);
}

export function apiLoginAccount(loginModel, callback, errorCallback){
    var url = BaseUrl.AUTH_URL + '/connect/token';
    fetchLogin(url, loginModel, callback, errorCallback);
}

/* Comment */
export function apiGetCommentsByArticleById(articleId, callback, errorCallback){
    var url = BaseUrl.BASE_URL + ServiceUrl.COMMENT_URL + 'GetCommentsByArticleById/' + articleId;
    fetchApi(url, 'GET', undefined, callback, errorCallback);
}

export function apiCreateComment(comment, callback, errorCallback){
    var url = BaseUrl.BASE_URL + ServiceUrl.COMMENT_URL;
    fetchApi(url, 'POST', comment , callback, errorCallback);
}