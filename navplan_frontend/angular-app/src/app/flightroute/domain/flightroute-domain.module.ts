import {NgModule} from '@angular/core';
import {IFlightrouteService} from './service/i-flightroute.service';
import {FlightrouteService} from './service/flightroute.service';


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
export class FlightrouteDomainModule {}
