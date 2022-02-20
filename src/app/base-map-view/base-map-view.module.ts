import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {OlMapContainerComponent} from './ng-components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from './ng-components/zoom-buttons/zoom-buttons.component';
import {BaseMapModule} from '../base-map/base-map.module';
import {BaseMapStateModule} from '../base-map-state/base-map-state.module';
import {OlOverlayButtonCloseComponent} from './ng-components/ol-overlay-button-close/ol-overlay-button-close.component';
import {LayerButtonComponent} from './ng-components/layer-button/layer-button.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LayerSelectionComponent} from './ng-components/layer-selection/layer-selection.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        BaseMapModule,
        BaseMapStateModule,
        MatTooltipModule,
        MatRadioModule,
    ],
    declarations: [
        OlMapContainerComponent,
        ZoomButtonsComponent,
        LayerButtonComponent,
        LayerSelectionComponent,
        OlOverlayButtonCloseComponent,
    ],
    exports: [
        OlMapContainerComponent,
        ZoomButtonsComponent,
        LayerButtonComponent,
        LayerSelectionComponent,
    ],
    providers: [
    ]
})
export class BaseMapViewModule {}
