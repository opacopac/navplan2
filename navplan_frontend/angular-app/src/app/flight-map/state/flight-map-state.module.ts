import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {flightMapReducer} from './ngrx/flight-map.reducer';
import {FlightMapEffects} from './ngrx/flight-map.effects';
import {FlightMapStateService} from './ngrx/flight-map-state.service';
import {FlightMapDomainModule} from '../domain/flight-map-domain.module';


@NgModule({
    imports: [
        StoreModule.forFeature('flightMapState', flightMapReducer),
        EffectsModule.forFeature([FlightMapEffects]),
        FlightMapDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        FlightMapStateService,
    ]
})
export class FlightMapStateModule {
}
