import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {FlightrouteRestService} from './rest-service/flightroute-rest.service';
import {IFlightrouteRepo} from './domain-service/i-flightroute-repo';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IFlightrouteRepo, useClass: FlightrouteRestService }
    ],
})
export class FlightrouteModule {}
