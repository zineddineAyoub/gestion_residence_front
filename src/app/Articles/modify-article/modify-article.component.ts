import { AuthentificationService } from '../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-article',
  templateUrl: './modify-article.component.html',
  styleUrls: ['./modify-article.component.css']
})
export class ModifyArticleComponent implements OnInit {
  private link = "http://127.0.0.1:1000/storage/article_images/";
  private articles;
  public deleted=false;
  public error=false;
  constructor(private service:ArticleService,private router:Router,private serviceAuth:AuthentificationService) { }

  ngOnInit(): void {

    if(!this.serviceAuth.isLoggedIn()){
      this.router.navigate(['login']);  
    }

    else
    {
      this.service.getArticles().subscribe((data)=>{
        let result = data.json();
        this.articles=result;
      },
      (error=>{
        if(error.status == 401)
        {
          this.router.navigate(['login'])
        }
      }))
    }
    
  }

  deleteArticle(article)
  {
   let confirmation = confirm("Voulez vous vraiment supprimer cet Article ?");
   if(confirmation)
   {
    this.service.deleteArticle(article).subscribe(
      (data)=>{
        this.articles = this.articles.filter(h=>h != article);
        this.deleted=true;
        this.scrollTop();
      },(err=>{
          this.error = true;
          this.scrollTop();
      })
    )
   }
    
  }

  scrollTop() {
    window.scroll(0,0);
}

}
