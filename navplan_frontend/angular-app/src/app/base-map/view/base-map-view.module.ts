import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {OlMapContainerComponent} from './ng-components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from './ng-components/zoom-buttons/zoom-buttons.component';
import {BaseMapDomainModule} from '../domain/base-map-domain.module';
import {BaseMapStateModule} from '../state/base-map-state.module';
import {OlOverlayButtonCloseComponent} from './ng-components/ol-overlay-button-close/ol-overlay-button-close.component';
import {LayerButtonComponent} from './ng-components/layer-button/layer-button.component';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {LayerSelectionComponent} from './ng-components/layer-selection/layer-selection.component';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        BaseMapDomainModule,
        BaseMapStateModule,
        MatTooltipModule,
        MatRadioModule,
        MatCheckboxModule
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
