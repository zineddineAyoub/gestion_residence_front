import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {
  private link = "http://127.0.0.1:1000/storage/article_images/";
  public id_article;
  public article;
  public loaded=false;
  constructor(private route:ActivatedRoute,private service:ArticleService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data)=>{
      this.id_article = data.get("id_article");

      this.service.showArticle(this.id_article).subscribe((res)=>{ 

        this.article = res.json();
        this.loaded = true;
        console.log(this.article);
        
        
      })

        
    });
  }

}
