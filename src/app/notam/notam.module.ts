import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotamService} from './rest/notam.service';
import {MapOverlayButtonNotamComponent} from './components/map-overlay-button-notam/map-overlay-button-notam.component';
import {OlOverlayNotamComponent} from './components/map-overlay-notam/ol-overlay-notam.component';
import {MapOverlayNotamItemComponent} from './components/map-overlay-notam-item/map-overlay-notam-item.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {notamReducer} from './ngrx/notam.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NotamEffects} from './ngrx/notam.effects';
import {NotamState} from './domain/notam-state';
import {NotamActions} from './ngrx/notam.actions';
import {MatCardModule} from '@angular/material';
import {OlMapModule} from '../ol-map/ol-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<NotamState, NotamActions>('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
        MatCardModule,
        SharedModule,
        OlMapModule,
    ],
    declarations: [
        MapOverlayButtonNotamComponent,
        OlOverlayNotamComponent,
        MapOverlayNotamItemComponent
    ],
    exports: [
        MapOverlayButtonNotamComponent,
        OlOverlayNotamComponent,
        MapOverlayNotamItemComponent
    ],
    providers: [
        NotamService
    ]
})
export class NotamModule {}
