import { AuthentificationService } from './../../services/authentification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from './../../services/article.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  id_category = new FormControl('');
  public Editor = ClassicEditor;
  public categories;
  public success:boolean;
  public loaded=false;

  public tag;
  public list_tags;
  public all_tags;
  public selectedTags=[];

  public addComponent;
  public editComponent;

  public id;

  form = new FormGroup({
    title : new FormControl('',
    [Validators.required,
    Validators.minLength(3)
  ]),
    content : new FormControl('',Validators.required),
    position : new FormControl(''),
    picture : new FormControl(''),
    meta_description : new FormControl(''),
    meta_keywords : new FormControl(''),
    id_category : new FormControl(''),
    tag : new FormControl('')
  });

  article;
  id_article;

  constructor(
    private service:ArticleService,
    private serviceAuth:AuthentificationService,
    private router:Router,
    private route:ActivatedRoute,
    ) { }

  ngOnInit(): void {

    console.log("First");
    console.log(this.form.value);
    
    
    if(!this.serviceAuth.isLoggedIn()){
      this.router.navigate(['login']);  
    }

    else{
      this.id = this.route.snapshot.paramMap.get('id_article');
      if(this.id)
      {
        this.editComponent = true;
        this.addComponent = false;
        this.id_article = this.id;
  
        this.service.showArticle(this.id_article).subscribe((res)=>{
        
          this.article = res.json();
          this.selectedTags = res.json().tags;
    
          this.service.getCategories().subscribe((data)=>{
            this.categories = data.json();
            
            this.form.patchValue({
              id_category:this.article.id_category
            })
            //this.id_category.setValue(this.article.id_category);
            
          })
      
          try {
           
            this.form.patchValue({
              title:this.article.title,
              content:(this.article.content),
              position : this.article.position,
               meta_description:this.article.meta_description,
              meta_keywords:this.article.meta_keywords,
              picture:this.article.picture,
             })
          } catch (error) { }
        
        })
      
       
      }

      else{
          this.addComponent = true;
          this.editComponent = false;
          this.service.getCategories().subscribe((data)=>{
            this.categories = data.json();});
      }
       
      this.service.getTags().subscribe((data)=>{
        let result = data.json();
        this.all_tags = result; 
      
        
      });
    }

   // this.route.paramMap.pipe(map(()=>window.history.state))
  
  }

  filedata:any;
  fileEvent(e){
    console.log(e.target.files[0]);
    
      this.filedata = e.target.files[0];
  }

  submit()
  {
    console.log(this.form.value);
    
    this.serviceAuth.me().subscribe((data)=>{
      let auth = data.json();
     
      
      this.form.value['tags']=this.selectedTags;

      if(this.id)
      {
        this.form.value['id_article']=this.id_article;
        this.service.updateArticle(this.form.value,this.filedata).subscribe((data)=>{
          console.log(data);  
         this.success = true
         this.scrollTop();
        }) 
      }

      else{
        this.form.value['id_user']=auth.id_user;
        this.service.addArticle(this.form.value,this.filedata).subscribe((data)=>{
          
          this.success = true;
          this.scrollTop();
          this.form.reset(); 
          this.form.patchValue({picture:"",meta_description:"",meta_keywords:""});
          this.selectedTags=[];
          this.list_tags=[]  
          console.log("Last");
          console.log(this.form.value);
          
          
                
        },
        (error)=>{
          this.form.setErrors(error);
          this.scrollTop();
        });
      }
    })
   
    
    
  }

 
  addTag(tag)
  {
   
    this.selectedTags.push(tag);
    this.all_tags = this.all_tags.filter(h=>h != tag);
    this.list_tags=[];
    this.form.patchValue({
      tag:""
    })
    
  }

  deleteTag(tag)
  {
    this.selectedTags = this.selectedTags.filter(h=>h != tag);
    this.all_tags.push(tag);  
  }

  addNewTag()
  {
    
    if(this.selectedTags.some(tag => tag.name_tag === this.form.get('tag').value))
    {
      alert("This Tag Already Exists");
    }
    else{
      this.selectedTags.push({name_tag : this.form.get('tag').value.toLowerCase()});
    this.form.patchValue({
      tag:""
    })
    console.log(this.form.get('tag').value);
    }
    
  }

  typed()
  {
    if(!this.form.get('tag').value)
    {
       this.list_tags = [];
    }

    else{
      this.tag = this.form.get('tag').value;
      this.list_tags = this.all_tags.filter(element => element.name_tag.startsWith(this.tag)); 
    }
    
   
  }

  scrollTop() {
    window.scroll(0,0);
}
}

