import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {RestAirspaceService} from './rest-service/rest-airspace.service';
import {AirspaceService} from './domain-service/airspace.service';
import {NavaidService} from './domain-service/navaid.service';
import {RestNavaidService} from './rest-service/rest-navaid.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {navaidReducer} from './ngrx/navaid.reducer';
import {NavaidEffects} from './ngrx/navaid.effects';
import {AirspaceEffects} from './ngrx/airspace.effects';
import {airspaceReducer} from './ngrx/airspace.reducer';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('navaidState', navaidReducer),
        StoreModule.forFeature('airspaceState', airspaceReducer),
        EffectsModule.forFeature([NavaidEffects, AirspaceEffects]),
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        AirspaceService,
        RestAirspaceService,
        NavaidService,
        RestNavaidService
    ]
})
export class EnrouteModule {}
