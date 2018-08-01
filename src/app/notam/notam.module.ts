import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotamService} from './services/notam.service';
import {MapOverlayButtonNotamComponent} from './components/map-overlay-button-notam/map-overlay-button-notam.component';
import {MapOverlayNotamComponent} from './components/map-overlay-notam/map-overlay-notam.component';
import {MapOverlayNotamItemComponent} from './components/map-overlay-notam-item/map-overlay-notam-item.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {notamReducer} from './notam.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NotamEffects} from './notam.effects';
import {NotamState} from './model/notam-state';
import {NotamActions} from './notam.actions';
import {MatCardModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature<NotamState, NotamActions>('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
        MatCardModule,
    ],
    declarations: [
        MapOverlayButtonNotamComponent,
        MapOverlayNotamComponent,
        MapOverlayNotamItemComponent
    ],
    exports: [
        MapOverlayButtonNotamComponent,
        MapOverlayNotamComponent,
        MapOverlayNotamItemComponent
    ],
    providers: [
        NotamService
    ]
})
export class NotamModule {}
