import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {verticalMapReducer} from './ngrx/vertical-map.reducer';
import {VerticalMapEffects} from './ngrx/vertical-map.effects';
import {VerticalMapComponent} from './ng-components/vertical-map/vertical-map.component';


@NgModule({
    declarations: [
    VerticalMapComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('verticalMapState', verticalMapReducer),
        EffectsModule.forFeature([VerticalMapEffects]),
        FlightrouteModule,
    ]
})
export class VerticalMapModule {
}
