import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {airportReducer} from './ngrx/airport-reducer';
import {AirportState} from './ngrx/airport-state';
import {AirportActions} from './ngrx/airport-actions';
import {AirportEffects} from './ngrx/airport-effects';
import {AirportService} from './rest-service/airport.service';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<AirportState, AirportActions>('airportState', airportReducer),
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
