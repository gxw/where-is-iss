import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AgmCoreModule} from '@angular/googleMaps/core';
import {AppComponent} from './app.component';
import {PositionComponent} from './pages/position/position.component';

import {HttpModule} from "@angular/http";

@NgModule({
    imports: [
        BrowserModule,    
        HttpModule,    
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB-9CDB5jRMp0KMg-hWTuQzLiVYnEJyCLU'
        })
    ],
    //  declarations: [ AppComponent ],
    //  bootstrap:    [ AppComponent ],
    declarations: [PositionComponent],
    bootstrap: [PositionComponent]
})

export class AppModule {}