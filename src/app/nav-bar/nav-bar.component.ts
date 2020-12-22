import { ReclamationService } from './../services/reclamation.service';
import { Observable } from 'rxjs';
import { ArticleService } from './../services/article.service';
import { AuthentificationService } from './../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public first_name;
 // public search_tag;
 // public search_input={};
  public loggedIn = false;
  public code_reclamation;
 
  public reclamations = [];
  constructor(public service: AuthentificationService,
    private router:Router,
    private serviceArticle:ArticleService,
    private serviceReclamation : ReclamationService) { }

  ngOnInit(): void {

   this.serviceReclamation.getReclamations().subscribe((data)=>{
    
      this.reclamations = data.json();
      console.log("this reclamations ",this.reclamations);
      
     
   })  
  }

  logOut()
  {
    this.loggedIn=false;
    this.service.logOut();
    this.router.navigate(['login'])
  }
  
  /*
  search()
  {
    this.search_input["name_tag"] = this.search_tag;
    this.router.navigate(['/searchArticle/'+this.search_input["name_tag"]]); 
  }*/

  searchReclamation()
  {
    this.router.navigate(['/reclamation/'+this.code_reclamation]);
  }
}
