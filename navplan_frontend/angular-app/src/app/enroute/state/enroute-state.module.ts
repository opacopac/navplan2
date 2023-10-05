import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {navaidReducer} from './ngrx/navaid/navaid.reducer';
import {airspaceReducer} from './ngrx/airspace/airspace.reducer';
import {AirspaceEffects} from './ngrx/airspace/airspace.effects';
import {NavaidEffects} from './ngrx/navaid/navaid.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('navaidState', navaidReducer),
        StoreModule.forFeature('airspaceState', airspaceReducer),
        EffectsModule.forFeature([NavaidEffects, AirspaceEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class EnrouteStateModule {}
