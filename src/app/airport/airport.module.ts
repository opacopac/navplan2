import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {AirportEffects} from './ngrx/airport-effects';
import {AirportService} from './rest-service/airport.service';


@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([AirportEffects]),
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        AirportService
    ]
})
export class AirportModule {}
