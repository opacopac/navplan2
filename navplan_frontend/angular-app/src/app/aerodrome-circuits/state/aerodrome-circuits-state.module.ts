import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportCircuitReducer} from './ngrx/airport-circuit.reducer';
import {AirportCircuitEffects} from './ngrx/airport-circuit.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('airportCircuitState', airportCircuitReducer),
        EffectsModule.forFeature([
            AirportCircuitEffects
        ]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeCircuitsStateModule {
}
