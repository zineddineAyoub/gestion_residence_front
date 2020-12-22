import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { ArticleService } from './../../services/article.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public articles=[];
  public notFound;
  private link = "http://127.0.0.1:1000/storage/article_images/";
  constructor(private route:ActivatedRoute,private service:ArticleService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data)=>{
      console.log(data.get("nom_tag"));

      this.service.search(data.get("nom_tag")).subscribe((res)=>{
        console.log(res.json());
        this.articles = res.json();
        
      },(error)=>{
        this.notFound=true;
      }); 
      
      
    })

   /* let result = history.state.data["result"];
    this.articles = history.state.data["result"];
    console.log(result);*/

  }

}
