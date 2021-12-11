import {NgModule} from '@angular/core';
import {IFlightrouteService} from './domain-service/i-flightroute.service';
import {FlightrouteService} from './domain-service/flightroute.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IFlightrouteService, useClass: FlightrouteService }
    ],
})
export class FlightrouteModule {}
