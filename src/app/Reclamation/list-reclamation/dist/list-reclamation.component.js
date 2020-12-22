"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListReclamationComponent = void 0;
var core_1 = require("@angular/core");
var ListReclamationComponent = /** @class */ (function () {
    function ListReclamationComponent(service, router, serviceAuth) {
        this.service = service;
        this.router = router;
        this.serviceAuth = serviceAuth;
        this.deleted = false;
    }
    ListReclamationComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.serviceAuth.isLoggedIn()) {
            this.router.navigate(['login']);
        }
        else {
            this.service.getReclamations().subscribe(function (data) {
                console.log(data.json());
                _this.reclamations = data.json();
            });
        }
        try {
            if (history.state.data.deleted) {
                this.deleted = true;
            }
        }
        catch (_a) { }
    };
    ListReclamationComponent.prototype.deleteReclamation = function (reclamation) {
        var _this = this;
        if (confirm("Voulez vous vraiment supprimer la réclamation N°: " + reclamation.code_reclamation)) {
            this.service.deleteReclamation(reclamation.id_reclamation).subscribe(function (data) {
                _this.reclamations = _this.reclamations.filter(function (h) { return h != reclamation; });
                _this.deleted = true;
            });
        }
    };
    ListReclamationComponent = __decorate([
        core_1.Component({
            selector: 'app-list-reclamation',
            templateUrl: './list-reclamation.component.html',
            styleUrls: ['./list-reclamation.component.css']
        })
    ], ListReclamationComponent);
    return ListReclamationComponent;
}());
exports.ListReclamationComponent = ListReclamationComponent;
