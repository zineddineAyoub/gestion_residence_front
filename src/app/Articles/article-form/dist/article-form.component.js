"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArticleFormComponent = void 0;
var ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var ArticleFormComponent = /** @class */ (function () {
    function ArticleFormComponent(service, serviceAuth, router, route) {
        this.service = service;
        this.serviceAuth = serviceAuth;
        this.router = router;
        this.route = route;
        this.id_category = new forms_1.FormControl('');
        this.Editor = ClassicEditor;
        this.loaded = false;
        this.selectedTags = [];
        this.form = new forms_1.FormGroup({
            title: new forms_1.FormControl('', [forms_1.Validators.required,
                forms_1.Validators.minLength(3)
            ]),
            content: new forms_1.FormControl('', forms_1.Validators.required),
            position: new forms_1.FormControl(''),
            picture: new forms_1.FormControl(''),
            meta_description: new forms_1.FormControl(''),
            meta_keywords: new forms_1.FormControl(''),
            id_category: new forms_1.FormControl(''),
            tag: new forms_1.FormControl('')
        });
    }
    ArticleFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("First");
        console.log(this.form.value);
        if (!this.serviceAuth.isLoggedIn()) {
            this.router.navigate(['login']);
        }
        else {
            this.id = this.route.snapshot.paramMap.get('id_article');
            if (this.id) {
                this.editComponent = true;
                this.addComponent = false;
                this.id_article = this.id;
                this.service.showArticle(this.id_article).subscribe(function (res) {
                    _this.article = res.json();
                    _this.selectedTags = res.json().tags;
                    _this.service.getCategories().subscribe(function (data) {
                        _this.categories = data.json();
                        _this.form.patchValue({
                            id_category: _this.article.id_category
                        });
                        //this.id_category.setValue(this.article.id_category);
                    });
                    try {
                        _this.form.patchValue({
                            title: _this.article.title,
                            content: (_this.article.content),
                            position: _this.article.position,
                            meta_description: _this.article.meta_description,
                            meta_keywords: _this.article.meta_keywords,
                            picture: _this.article.picture
                        });
                    }
                    catch (error) { }
                });
            }
            else {
                this.addComponent = true;
                this.editComponent = false;
                this.service.getCategories().subscribe(function (data) {
                    _this.categories = data.json();
                });
            }
            this.service.getTags().subscribe(function (data) {
                var result = data.json();
                _this.all_tags = result;
            });
        }
        // this.route.paramMap.pipe(map(()=>window.history.state))
    };
    ArticleFormComponent.prototype.fileEvent = function (e) {
        console.log(e.target.files[0]);
        this.filedata = e.target.files[0];
    };
    ArticleFormComponent.prototype.submit = function () {
        var _this = this;
        console.log(this.form.value);
        this.serviceAuth.me().subscribe(function (data) {
            var auth = data.json();
            _this.form.value['tags'] = _this.selectedTags;
            if (_this.id) {
                _this.form.value['id_article'] = _this.id_article;
                _this.service.updateArticle(_this.form.value, _this.filedata).subscribe(function (data) {
                    console.log(data);
                    _this.success = true;
                    _this.scrollTop();
                });
            }
            else {
                _this.form.value['id_user'] = auth.id_user;
                _this.service.addArticle(_this.form.value, _this.filedata).subscribe(function (data) {
                    _this.success = true;
                    _this.scrollTop();
                    _this.form.reset();
                    _this.form.patchValue({ picture: "", meta_description: "", meta_keywords: "" });
                    _this.selectedTags = [];
                    _this.list_tags = [];
                    console.log("Last");
                    console.log(_this.form.value);
                }, function (error) {
                    _this.form.setErrors(error);
                    _this.scrollTop();
                });
            }
        });
    };
    ArticleFormComponent.prototype.addTag = function (tag) {
        this.selectedTags.push(tag);
        this.all_tags = this.all_tags.filter(function (h) { return h != tag; });
        this.list_tags = [];
        this.form.patchValue({
            tag: ""
        });
    };
    ArticleFormComponent.prototype.deleteTag = function (tag) {
        this.selectedTags = this.selectedTags.filter(function (h) { return h != tag; });
        this.all_tags.push(tag);
    };
    ArticleFormComponent.prototype.addNewTag = function () {
        var _this = this;
        if (this.selectedTags.some(function (tag) { return tag.name_tag === _this.form.get('tag').value; })) {
            alert("This Tag Already Exists");
        }
        else {
            this.selectedTags.push({ name_tag: this.form.get('tag').value.toLowerCase() });
            this.form.patchValue({
                tag: ""
            });
            console.log(this.form.get('tag').value);
        }
    };
    ArticleFormComponent.prototype.typed = function () {
        var _this = this;
        if (!this.form.get('tag').value) {
            this.list_tags = [];
        }
        else {
            this.tag = this.form.get('tag').value;
            this.list_tags = this.all_tags.filter(function (element) { return element.name_tag.startsWith(_this.tag); });
        }
    };
    ArticleFormComponent.prototype.scrollTop = function () {
        window.scroll(0, 0);
    };
    ArticleFormComponent = __decorate([
        core_1.Component({
            selector: 'app-article-form',
            templateUrl: './article-form.component.html',
            styleUrls: ['./article-form.component.css']
        })
    ], ArticleFormComponent);
    return ArticleFormComponent;
}());
exports.ArticleFormComponent = ArticleFormComponent;
