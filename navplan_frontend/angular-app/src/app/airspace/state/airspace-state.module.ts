import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airspaceReducer} from './ngrx/airspace.reducer';
import {AirspaceEffects} from './ngrx/airspace.effects';
import {AirspaceDomainModule} from '../domain/airspace-domain.module';
import {AirspaceRestModule} from '../rest/airspace-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('airspaceState', airspaceReducer),
        EffectsModule.forFeature([AirspaceEffects]),
        AirspaceDomainModule,
        AirspaceRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AirspaceStateModule {
}
