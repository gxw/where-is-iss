"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
* Import angular modules
*/
var core_1 = require("@angular/core");
var position_service_1 = require("../../shared/position/position.service");
/**
 * @Component configuration
 */
var PositionComponent = (function () {
    /**
     * Contructor
     * * @param PositionService positionService
     */
    function PositionComponent(positionService) {
        this.positionService = positionService;
    }
    /**
     * Execute getOnePosition / getSatelites ngOnInit life cykle
     */
    PositionComponent.prototype.ngOnInit = function () {
        this.getOnePosition();
        this.getSatelites();
    };
    /**
     * Fill Position object
     * return @void
     */
    PositionComponent.prototype.getOnePosition = function () {
        var _this = this;
        this.positionService.getPostion(25544).subscribe(function (position) { return _this.position = position; });
    };
    /**
     * Fill Sataelite array
     * return @void
     */
    PositionComponent.prototype.getSatelites = function () {
        var _this = this;
        this.positionService.getList().subscribe(function (list) { return _this.sateliteList = list; });
    };
    /**
     * Refresh data via click event
     * return @void
     */
    PositionComponent.prototype.refreshData = function () {
        this.getOnePosition();
    };
    return PositionComponent;
}());
PositionComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [position_service_1.PositionService],
        templateUrl: "./position.html",
        styleUrls: ["./position.css"]
    }),
    __metadata("design:paramtypes", [position_service_1.PositionService])
], PositionComponent);
exports.PositionComponent = PositionComponent;
//# sourceMappingURL=position.component.js.map