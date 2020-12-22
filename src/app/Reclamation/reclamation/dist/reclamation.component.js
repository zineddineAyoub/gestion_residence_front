"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReclamationComponent = void 0;
var core_1 = require("@angular/core");
//import * as jspdf from 'jspdf';  
//import html2canvas from 'html2canvas';  
var ReclamationComponent = /** @class */ (function () {
    function ReclamationComponent(route, service, serviceAuth, router) {
        this.route = route;
        this.service = service;
        this.serviceAuth = serviceAuth;
        this.router = router;
        this.new_state = 0;
        this.notFound = false;
        this.loaded = false;
    }
    ReclamationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (data) {
            _this.service.getOneReclamation(data.get("id_reclamation")).subscribe((function (res) {
                try {
                    _this.reclamation = res.json();
                    _this.loaded = true;
                    _this.notFound = false;
                }
                catch (error) {
                    console.log("lol");
                    _this.notFound = true;
                    _this.loaded = true;
                }
                console.log(_this.reclamation);
            }));
        });
        this.service.getReclamationStates().subscribe(function (data) {
            console.log(data.json());
            _this.states = data.json();
        });
    };
    ReclamationComponent.prototype.addState = function () {
        var _this = this;
        if (confirm("Voulez Vous vraiment changer l'état à " + this.states[this.new_state - 1].name_reclamation_state)) {
            console.log(this.new_state);
            var body = {
                id_reclamation: this.reclamation["id_reclamation"],
                id_reclamation_state: this.new_state
            };
            console.log(body);
            this.service.addState(body).subscribe(function (data) {
                console.log(data);
                _this.reclamation.reclamation_states.push(data.json());
            });
        }
    };
    ReclamationComponent.prototype["delete"] = function (id_reclamation) {
        var _this = this;
        if (confirm("Voulez-vous vraiment supprimer cette réclamation")) {
            this.service.deleteReclamation(id_reclamation).subscribe(function (data) {
                // this.router.navigate(['listReclamation']);
                _this.router.navigate(['listReclamation'], { state: { data: { deleted: true } } });
            });
        }
    };
    ReclamationComponent.prototype.print = function (code_reclamation) {
        // this.router.navigate(['http://localhost:1000/api/reclamationPdf/LG0QKF']);
        window.location.href = 'http://localhost:1000/api/reclamationPdf/' + code_reclamation;
    };
    __decorate([
        core_1.ViewChild('found1', { static: false })
    ], ReclamationComponent.prototype, "found1");
    ReclamationComponent = __decorate([
        core_1.Component({
            selector: 'app-reclamation',
            templateUrl: './reclamation.component.html',
            styleUrls: ['./reclamation.component.css']
        })
    ], ReclamationComponent);
    return ReclamationComponent;
}());
exports.ReclamationComponent = ReclamationComponent;
