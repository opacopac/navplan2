import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestNotamRepo} from './rest-service/rest-notam-repo.service';
import {MapOverlayNotamItemComponent} from './ng-components/map-overlay-notam-item/map-overlay-notam-item.component';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {notamReducer} from './ngrx/notam.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NotamEffects} from './ngrx/notam.effects';
import {MatCardModule} from '@angular/material/card';
import {BaseMapModule} from '../base-map/base-map.module';
import {INotamRepo} from './domain-service/i-notam-repo';
import {NotamService} from './domain-service/notam-service';
import {INotamService} from './domain-service/i-notam-service';
import {MapOverlayNotamTabComponent} from './ng-components/map-overlay-notam-tab/map-overlay-notam-tab.component';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
        MatCardModule,
        SharedModule,
        BaseMapModule,
    ],
    declarations: [
        MapOverlayNotamTabComponent,
        MapOverlayNotamItemComponent
    ],
    exports: [
        MapOverlayNotamTabComponent,
        MapOverlayNotamItemComponent
    ],
    providers: [
        { provide: INotamRepo, useClass: RestNotamRepo },
        { provide: INotamService, useClass: NotamService },
    ]
})
export class NotamModule {}
