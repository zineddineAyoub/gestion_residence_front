import { AuthentificationService } from './authentification.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  link='http://127.0.0.1:1000/api/';

  constructor(private http:Http,private httpClient:HttpClient) { }

  getArticles()
  {
    return this.http.get(this.link+"index",this.header);
  }

  getCategories()
  {
    return this.http.get(this.link+"category/index",this.header);
  }

  addArticle(articleDetails,filedata)
  {
    let token = localStorage.getItem('token');
    var formData = new FormData();

    if(!filedata || filedata==undefined || filedata == null ) {}

    else{
      formData.append('picture',filedata);
    }   
       
      for (var key in articleDetails)
      {
        if(key==="tags")
        {
         articleDetails[key] = JSON.stringify(articleDetails[key]);
        }
         formData.append(key,articleDetails[key]);
      }

    return this.httpClient.post(this.link+"article",formData,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + token})});
  }

  deleteArticle(article)
  {
   return this.http.delete(this.link+"article/"+article.id_article,this.header)
  }

  updateArticle(articleDetails,filedata)
  {
    let token = localStorage.getItem('token');
    var formData = new FormData();

    if(!filedata || filedata==undefined || filedata == null ){}

    else{
      formData.append('picture',filedata);
    }   
       
      for (var key in articleDetails)
      {  
        if(key==="tags")
        { 
         articleDetails[key] = JSON.stringify(articleDetails[key]); 
        }
        
          if(articleDetails[key]==null)
          {
          continue;  
          }
        
         formData.append(key,articleDetails[key]);
      }

    return this.httpClient.post(this.link+"article/"+articleDetails.id_article,formData,{headers: new HttpHeaders({'Authorization': 'Bearer ' + token})})
    
  }

  showArticle(article)
  {
   
    return this.http.get(this.link+"article/"+article,this.header);
  }

  getTags()
  {
    return this.http.get(this.link+"tag/index");
  }

  search(tag)
  {
    return this.http.get(this.link+"article/search/"+tag,this.header);
  }

  get header()
  {
    return AuthentificationService.headerAuthorization();
  }
}
