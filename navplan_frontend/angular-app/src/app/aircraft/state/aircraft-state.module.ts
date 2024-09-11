import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {aircraftReducer} from './ngrx/aircraft.reducer';
import {AircraftEffects} from './ngrx/aircraft.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('aircraftState', aircraftReducer),
        EffectsModule.forFeature([AircraftEffects]),
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class AircraftStateModule {
}
