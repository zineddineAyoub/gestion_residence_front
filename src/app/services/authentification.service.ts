import { JwtHelper, tokenNotExpired} from 'angular2-jwt';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Injectable } from '@angular/core';


declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  link='http://127.0.0.1:1000/api/';
  constructor(private http:Http) { }

  login(credentials)
  {
    return this.http.post("http://127.0.0.1:1000/api/auth/login",credentials)
    .pipe(map(response=>{
      let result = response.json();
     
      if(result && result.access_token)
      {
        console.log("Good");
        
        console.log(result.access_token);
        localStorage.setItem('token',result.access_token);
        return true;
      }

      console.log("Bad");
      return false;
      
    }))
   
  }

  me()
  {
    return this.http.get(this.link+"auth/me",this.header);
  }

  get currentUser(){
     let token = localStorage.getItem('token');
    if(!token) return null;
    return new JwtHelper().decodeToken(token);
  }

  logOut()
  {
    localStorage.removeItem('token');
  }

  isLoggedIn()
  {
    return tokenNotExpired();
   
  }

 static headerAuthorization()
  {
    let headers = new Headers();
    let token = localStorage.getItem('token');
    headers.append('Authorization','Bearer '+token);
    let options = new RequestOptions({headers:headers});
    return options;
  }

  get header()
  {
    return AuthentificationService.headerAuthorization();
  }


}
