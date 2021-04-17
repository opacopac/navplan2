import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotamRepoService} from './rest-service/notam-repo.service';
import {MapOverlayButtonNotamComponent} from './ng-components/map-overlay-button-notam/map-overlay-button-notam.component';
import {OlOverlayNotamComponent} from './ng-components/map-overlay-notam/ol-overlay-notam.component';
import {MapOverlayNotamItemComponent} from './ng-components/map-overlay-notam-item/map-overlay-notam-item.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {notamReducer} from './ngrx/notam.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NotamEffects} from './ngrx/notam.effects';
import {NotamState} from './domain-model/notam-state';
import {NotamActions} from './ngrx/notam.actions';
import {MatCardModule} from '@angular/material/card';
import {BaseMapModule} from '../base-map/base-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<NotamState, NotamActions>('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
        MatCardModule,
        SharedModule,
        BaseMapModule,
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
        NotamRepoService
    ]
})
export class NotamModule {}
