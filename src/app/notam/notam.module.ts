import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestNotamRepo} from './rest-service/rest-notam-repo.service';
import {SharedModule} from '../common/shared.module';
import {INotamRepo} from './domain-service/i-notam-repo';
import {StoreModule} from '@ngrx/store';
import {notamReducer} from './ngrx/notam.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NotamEffects} from './ngrx/notam.effects';
import {MapOverlayNotamTabComponent} from './ng-components/map-overlay-notam-tab/map-overlay-notam-tab.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
    ],
    declarations: [
        MapOverlayNotamTabComponent
    ],
    exports: [
        MapOverlayNotamTabComponent
    ],
    providers: [
        { provide: INotamRepo, useClass: RestNotamRepo },
    ]
})
export class NotamModule {}
