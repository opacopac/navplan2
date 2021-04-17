import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {OlBaseMapService} from './ol-service/ol-base-map.service';
import {OlMapContainerComponent} from './ng-components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from './ng-components/zoom-buttons/zoom-buttons.component';
import {baseMapReducer} from './ngrx/base-map.reducer';
import {BaseMapEffects} from './ngrx/base-map-effects.service';
import {BaseMapActions} from './ngrx/base-map.actions';
import {BaseMapState} from './domain-model/base-map-state';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<BaseMapState, BaseMapActions>('baseMapState', baseMapReducer),
        EffectsModule.forFeature([BaseMapEffects]),
        SharedModule,
    ],
    declarations: [
        OlMapContainerComponent,
        ZoomButtonsComponent,
    ],
    exports: [
        OlMapContainerComponent,
        ZoomButtonsComponent,
    ],
    providers: [
        OlBaseMapService
    ]
})
export class BaseMapModule {}
