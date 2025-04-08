import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {aircraftReducer} from './ngrx/aircraft.reducer';
import {AircraftEffects} from './ngrx/aircraft.effects';
import {AircraftTypeDesignatorEffects} from './ngrx/aircraft-type-designator.effects';
import {AircraftDomainModule} from '../domain/aircraft-domain.module';
import {AircraftRestModule} from '../rest/aircraft-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('aircraftState', aircraftReducer),
        EffectsModule.forFeature([AircraftEffects, AircraftTypeDesignatorEffects]),
        AircraftDomainModule,
        AircraftRestModule,
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class AircraftStateModule {
}
