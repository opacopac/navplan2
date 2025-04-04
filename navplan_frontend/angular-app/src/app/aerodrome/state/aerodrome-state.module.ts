import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportReducer} from './ngrx/airport.reducer';
import {AirportEffects} from './ngrx/airport.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('airportState', airportReducer),
        EffectsModule.forFeature([
            AirportEffects,
        ]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeStateModule {
}
