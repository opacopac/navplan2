import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {RestAirspaceService} from './rest-service/rest-airspace.service';
import {AirspaceService} from './domain-service/airspace.service';
import {NavaidService} from './domain-service/navaid.service';
import {RestNavaidService} from './rest-service/rest-navaid.service';


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
        AirspaceService,
        RestAirspaceService,
        NavaidService,
        RestNavaidService
    ]
})
export class EnrouteModule {}
