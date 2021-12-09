import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {notamReducer} from './ngrx/notam.reducer';
import {NotamEffects} from './ngrx/notam.effects';
import {MapOverlayNotamTabComponent} from './ng-components/map-overlay-notam-tab/map-overlay-notam-tab.component';
import {NotamModule} from '../notam/notam.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
        NotamModule,
    ],
    declarations: [
        MapOverlayNotamTabComponent
    ],
    exports: [
        MapOverlayNotamTabComponent
    ],
    providers: [
    ]
})
export class FlightMapNotamModule {}
