import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {AirportRestService} from './rest-service/airport-rest.service';
import {AirportService} from './domain-service/airport.service';


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
        AirportService,
        AirportRestService
    ]
})
export class AirportModule {}
