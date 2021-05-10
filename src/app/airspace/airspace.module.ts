import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {AirspaceService} from './rest-service/airspace.service';
import {AirspaceEffects} from './ngrx/airspace-effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AirspaceState} from './ngrx/airspace-state';
import {AirspaceActions} from './ngrx/airspace-actions';
import {airspaceReducer} from './ngrx/airspace-reducer';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<AirspaceState, AirspaceActions>('airspaceState', airspaceReducer),
        EffectsModule.forFeature([AirspaceEffects]),
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        AirspaceService
    ]
})
export class AirspaceModule {}
