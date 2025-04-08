import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportReducer} from './ngrx/airport.reducer';
import {AirportEffects} from './ngrx/airport.effects';
import {AerodromeDomainModule} from '../domain/aerodrome-domain.module';
import {AerodromeRestModule} from '../rest/aerodrome-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('airportState', airportReducer),
        EffectsModule.forFeature([AirportEffects]),
        AerodromeDomainModule,
        AerodromeRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeStateModule {
}
