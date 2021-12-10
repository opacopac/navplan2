import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {verticalMapReducer} from './ngrx/vertical-map.reducer';
import {VerticalMapEffects} from './ngrx/vertical-map.effects';
import {VerticalMapComponent} from './ng-components/vertical-map/vertical-map.component';
import {VerticalMapButtonComponent} from './ng-components/vertical-map-button/vertical-map-button.component';
import {FlightrouteStateModule} from '../flightroute-state/flightroute-state.module';


@NgModule({
    declarations: [
        VerticalMapComponent,
        VerticalMapButtonComponent
    ],
    exports: [
        VerticalMapComponent,
        VerticalMapButtonComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('verticalMapState', verticalMapReducer),
        EffectsModule.forFeature([VerticalMapEffects]),
        FlightrouteStateModule,
    ]
})
export class VerticalMapModule {
}
