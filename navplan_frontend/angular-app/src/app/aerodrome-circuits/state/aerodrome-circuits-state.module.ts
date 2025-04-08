import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportCircuitReducer} from './ngrx/airport-circuit.reducer';
import {AirportCircuitEffects} from './ngrx/airport-circuit.effects';
import {AerodromeCircuitsDomainModule} from '../domain/aerodrome-circuits-domain.module';
import {AerodromeCircuitsRestModule} from '../rest/aerodrome-circuits-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('airportCircuitState', airportCircuitReducer),
        EffectsModule.forFeature([AirportCircuitEffects]),
        AerodromeCircuitsDomainModule,
        AerodromeCircuitsRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeCircuitsStateModule {
}
