import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {BaseMapModule} from '../base-map/base-map.module';
import {FlightrouteStateModule} from '../flightroute-state/flightroute-state.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BaseMapModule,
        FlightrouteStateModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class FlightMapTrackModule {
}
