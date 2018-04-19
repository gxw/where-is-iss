import {Injectable} from "@angular/core";
import {Http, Response, Headers, BrowserXhr} from '@angular/http';
import {MapsAPILoader} from '@angular/googleMaps/core';
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

declare var google: any;

import {Satelite} from "../../shared/satelite/satelite"
import {Position} from "../../shared/position/position"
import {Config} from '../../shared/config';


@Injectable()


export class PositionService {


    private latlang: string = "";
    
    constructor(private http: Http, private mapsAPILoader: MapsAPILoader) {}

    reversGeocoding(pos: Position): Promise<void> {
        

        return this.mapsAPILoader.load().then(() => {

            let latlngStr = this.latlang.split(',', 2);
            //        let latlngStr = "40.714224,-73.961452".split(',', 2);
            let latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
            let geocoder = new google.maps.Geocoder;

            geocoder.geocode({'location': latlng}, function (results: any[], status: string) {

                if (status === 'OK') {
                    pos.reverse = results[0].formatted_address;
                }
                else {
                    pos.reverse = "Somewhere above the sea";
                }
            })
        })
    }

    getList(): Observable<Satelite[]> {

        return this.http.get(Config.apiUrl)

            .map((res: Response) => res.json())
            .map(data => {
                let sateliteList:any[] = [];
                let satelites = data;

                satelites.forEach((one: Satelite) => {
                    sateliteList.push(one);
                });

                return sateliteList;
            })
            .catch(this.handleErrors);


        ;
    }
    getPostion(id: number): Observable<Position> {

        return this.http.get(Config.apiUrl + "/" + id)
            .map((res: Response) => res.json())
            .map(data => {
                let position: Position;
                position = data;
                this.latlang = position.latitude + "," + position.longitude;
                position.reverse = "";
                this.reversGeocoding(position);

                return position;

            })
            .catch(this.handleErrors);
    }
    handleErrors(error: Response) {
        
        console.log(JSON.stringify(error));
        return Observable.throw(error);
    }
}