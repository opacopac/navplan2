import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {BaseMapService} from './services/base-map.service';
import {OlMapContainerComponent} from './components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from './components/zoom-buttons/zoom-buttons.component';
import {baseMapReducer} from './base-map.reducer';
import {BaseMapEffects} from './base-map.effects';
import {BaseMapActions} from './base-map.actions';
import {BaseMapState} from './base-map-state';

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
        BaseMapService
    ]
})
export class BaseMapModule {}
