"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var Article_pipe_1 = require("./pipes/Article.pipe");
var Edit_pipe_1 = require("./pipes/Edit.pipe");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var article_component_1 = require("./Articles/article/article.component");
var nav_bar_component_1 = require("./nav-bar/nav-bar.component");
var login_component_1 = require("./login/login.component");
var forms_1 = require("@angular/forms");
var modify_article_component_1 = require("./Articles/modify-article/modify-article.component");
var search_component_1 = require("./Articles/search/search.component");
var show_article_component_1 = require("./Articles/show-article/show-article.component");
var add_reclamation_component_1 = require("./Reclamation/add-reclamation/add-reclamation.component");
var core_2 = require("@agm/core");
var success_reclamation_component_1 = require("./Reclamation/success-reclamation/success-reclamation.component");
var list_reclamation_component_1 = require("./Reclamation/list-reclamation/list-reclamation.component");
var reclamation_component_1 = require("./Reclamation/reclamation/reclamation.component");
var not_found_component_1 = require("./not-found/not-found.component");
var ckeditor5_angular_1 = require("@ckeditor/ckeditor5-angular");
var html_pipe_1 = require("./pipes/html.pipe");
var article_form_component_1 = require("./Articles/article-form/article-form.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                article_component_1.ArticleComponent,
                nav_bar_component_1.NavBarComponent,
                login_component_1.LoginComponent,
                modify_article_component_1.ModifyArticleComponent,
                Edit_pipe_1.EditPipe,
                Article_pipe_1.ArticlePipe,
                search_component_1.SearchComponent,
                show_article_component_1.ShowArticleComponent,
                add_reclamation_component_1.AddReclamationComponent,
                success_reclamation_component_1.SuccessReclamationComponent,
                list_reclamation_component_1.ListReclamationComponent,
                reclamation_component_1.ReclamationComponent,
                not_found_component_1.NotFoundComponent,
                html_pipe_1.HtmlPipe,
                article_form_component_1.ArticleFormComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                ckeditor5_angular_1.CKEditorModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyAOs7hqT8ViRAwXsnZKqJeE-SbPHtsQmEM'
                }),
                router_1.RouterModule.forRoot([
                    { path: 'login', component: login_component_1.LoginComponent },
                    { path: 'article', component: article_component_1.ArticleComponent },
                    { path: 'ajouterArticle', component: article_form_component_1.ArticleFormComponent },
                    { path: 'modifierArticle', component: modify_article_component_1.ModifyArticleComponent },
                    { path: 'editArticle/:id_article', component: article_form_component_1.ArticleFormComponent },
                    { path: 'searchArticle/:nom_tag', component: search_component_1.SearchComponent },
                    { path: 'article/:id_article', component: show_article_component_1.ShowArticleComponent },
                    // {path : 'articleForm',component : ArticleFormComponent},
                    //{path : 'articleForm/:id_article', component : ArticleFormComponent},
                    { path: 'ajouterReclamation', component: add_reclamation_component_1.AddReclamationComponent },
                    { path: 'reclamationAjouté', component: success_reclamation_component_1.SuccessReclamationComponent },
                    { path: 'listReclamation', component: list_reclamation_component_1.ListReclamationComponent },
                    { path: 'reclamation/:id_reclamation', component: reclamation_component_1.ReclamationComponent },
                    { path: '', component: article_component_1.ArticleComponent },
                ])
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
