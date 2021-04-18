import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestNotamRepo} from './rest-service/rest-notam-repo.service';
import {MapOverlayButtonNotamComponent} from './ng-components/map-overlay-button-notam/map-overlay-button-notam.component';
import {OlOverlayNotamComponent} from './ng-components/map-overlay-notam/ol-overlay-notam.component';
import {MapOverlayNotamItemComponent} from './ng-components/map-overlay-notam-item/map-overlay-notam-item.component';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {notamReducer} from './ngrx/notam.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NotamEffects} from './ngrx/notam.effects';
import {NotamState} from './domain-model/notam-state';
import {NotamActions} from './ngrx/notam.actions';
import {MatCardModule} from '@angular/material/card';
import {BaseMapModule} from '../base-map/base-map.module';
import {INotamRepo} from './domain-service/i-notam-repo';
import {NotamService} from './domain-service/notam-service';


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
        { provide: INotamRepo, useClass: RestNotamRepo },
        NotamService
    ]
})
export class NotamModule {}
