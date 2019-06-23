import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {OlMapService} from './use-case/ol-map.service';
import {OlMapContainerComponent} from './components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from './components/zoom-buttons/zoom-buttons.component';
import {olMapReducer} from './ngrx/ol-map.reducer';
import {OlMapEffects} from './ngrx/ol-map.effects';
import {OlMapActions} from './ngrx/ol-map.actions';
import {OlMapState} from './domain/ol-map-state';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<OlMapState, OlMapActions>('baseMapState', olMapReducer),
        EffectsModule.forFeature([OlMapEffects]),
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
        OlMapService
    ]
})
export class OlMapModule {}
