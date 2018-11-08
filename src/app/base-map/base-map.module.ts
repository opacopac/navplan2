import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {BaseMapService} from './services/base-map.service';
import {OlMapContainerComponent} from './components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from './components/zoom-buttons/zoom-buttons.component';
import {StoreModule} from '@ngrx/store';
import {baseMapReducer} from './base-map.reducer';
import {EffectsModule} from '@ngrx/effects';
import {BaseMapEffects} from './base-map.effects';
import {BaseMapActions} from './base-map.actions';
import {BaseMapState} from './base-map-state';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<BaseMapState, BaseMapActions>('mapState', baseMapReducer),
        EffectsModule.forFeature([BaseMapEffects]),
        MatButtonModule,
        MatTooltipModule,
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
