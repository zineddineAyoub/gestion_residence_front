import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  private articles;
  private title="Home";
  private component_title="heeey";
  private link = "http://127.0.0.1:1000/storage/article_images/";
  constructor(private service:ArticleService,private router:Router) { }

  ngOnInit(): void {
      this.service.getArticles().subscribe((data)=>{
      
      let result = data.json();
      console.log(result);
      this.articles=result;
      console.log(this.articles);
    },
    (error=>{
      if(error.status == 401)
      {
        this.router.navigate(['login'])
      }
    }))
  }

}
