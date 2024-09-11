import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {aircraftReducer} from './ngrx/aircraft.reducer';
import {AircraftEffects} from './ngrx/aircraft.effects';
import {AircraftTypeDesignatorEffects} from './ngrx/aircraft-type-designator.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('aircraftState', aircraftReducer),
        EffectsModule.forFeature([AircraftEffects, AircraftTypeDesignatorEffects]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class AircraftStateModule {
}
