import {NgModule} from '@angular/core';
import {IFlightrouteService} from './service/i-flightroute.service';
import {FlightrouteService} from './service/flightroute.service';
import {IRouteMeteoService} from './service/i-route-meteo.service';
import {RouteMeteoService} from './service/route-meteo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IFlightrouteService, useClass: FlightrouteService},
        {provide: IRouteMeteoService, useClass: RouteMeteoService},
    ],
})
export class FlightrouteDomainModule {
}
