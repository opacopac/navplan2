import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airspaceReducer} from './ngrx/airspace.reducer';
import {AirspaceEffects} from './ngrx/airspace.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('airspaceState', airspaceReducer),
        EffectsModule.forFeature([AirspaceEffects]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AirspaceStateModule {
}
