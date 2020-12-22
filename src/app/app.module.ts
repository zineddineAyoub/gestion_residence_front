import { ArticlePipe } from './pipes/Article.pipe';
import { EditPipe } from './pipes/Edit.pipe';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './Articles/article/article.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ModifyArticleComponent } from './Articles/modify-article/modify-article.component';
import { SearchComponent } from './Articles/search/search.component';
import { ShowArticleComponent } from './Articles/show-article/show-article.component';
import { AddReclamationComponent } from './Reclamation/add-reclamation/add-reclamation.component';

import { AgmCoreModule } from '@agm/core';
import { SuccessReclamationComponent } from './Reclamation/success-reclamation/success-reclamation.component';
import { ListReclamationComponent } from './Reclamation/list-reclamation/list-reclamation.component';
import { ReclamationComponent } from './Reclamation/reclamation/reclamation.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HtmlPipe } from './pipes/html.pipe';
import { ArticleFormComponent } from './Articles/article-form/article-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    NavBarComponent,
    LoginComponent,
    ModifyArticleComponent,
    EditPipe,
    ArticlePipe,
    SearchComponent,
    ShowArticleComponent,
    AddReclamationComponent,
    SuccessReclamationComponent,
    ListReclamationComponent,
    ReclamationComponent,
    NotFoundComponent,
    HtmlPipe,
    ArticleFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    CKEditorModule,


    AgmCoreModule.forRoot({
      apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXX'

    }),
    RouterModule.forRoot([

      {path : 'login' , component : LoginComponent},

      {path : 'article', component : ArticleComponent},
      {path : 'ajouterArticle', component:ArticleFormComponent},
      {path : 'modifierArticle',component : ModifyArticleComponent},
      {path : 'editArticle/:id_article',component:ArticleFormComponent},
      {path : 'searchArticle/:nom_tag', component : SearchComponent},
      {path : 'article/:id_article',component : ShowArticleComponent},

     // {path : 'articleForm',component : ArticleFormComponent},
      //{path : 'articleForm/:id_article', component : ArticleFormComponent},

      {path : 'ajouterReclamation',component : AddReclamationComponent},
      {path : 'reclamationAjouté',component:SuccessReclamationComponent},
      {path : 'listReclamation', component:ListReclamationComponent},
      {path : 'reclamation/:id_reclamation',component : ReclamationComponent},
      {path : '', component : ArticleComponent},

     // {path:'ajouterReclamation',component : AddReclamationComponent}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
