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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var core_2 = require("@angular/googleMaps/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var config_1 = require("../../shared/config");
var PositionService = (function () {
    function PositionService(http, mapsAPILoader) {
        this.http = http;
        this.mapsAPILoader = mapsAPILoader;
        this.latlang = "";
    }
    PositionService.prototype.reversGeocoding = function (pos) {
        var _this = this;
        return this.mapsAPILoader.load().then(function () {
            var latlngStr = _this.latlang.split(',', 2);
            //        let latlngStr = "40.714224,-73.961452".split(',', 2);
            var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    pos.reverse = results[0].formatted_address;
                }
                else {
                    pos.reverse = "Somewhere above the sea";
                }
            });
        });
    };
    PositionService.prototype.getList = function () {
        return this.http.get(config_1.Config.apiUrl)
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var sateliteList = [];
            var satelites = data;
            satelites.forEach(function (one) {
                sateliteList.push(one);
            });
            return sateliteList;
        })
            .catch(this.handleErrors);
        ;
    };
    PositionService.prototype.getPostion = function (id) {
        var _this = this;
        return this.http.get(config_1.Config.apiUrl + "/" + id)
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var position;
            position = data;
            _this.latlang = position.latitude + "," + position.longitude;
            position.reverse = "";
            _this.reversGeocoding(position);
            return position;
        })
            .catch(this.handleErrors);
    };
    PositionService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error));
        return Rx_1.Observable.throw(error);
    };
    return PositionService;
}());
PositionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, core_2.MapsAPILoader])
], PositionService);
exports.PositionService = PositionService;
//# sourceMappingURL=position.service.js.map