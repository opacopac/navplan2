import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {OlMapContainerComponent} from './ng-components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from './ng-components/zoom-buttons/zoom-buttons.component';
import {BaseMapDomainModule} from '../domain/base-map-domain.module';
import {BaseMapStateModule} from '../state/base-map-state.module';
import {OlOverlayButtonCloseComponent} from './ng-components/ol-overlay-button-close/ol-overlay-button-close.component';
import {
    MapLayerSelectionButtonComponent
} from '../../flight-map/view/ng-components/map-layer-selection-button/map-layer-selection-button.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
    MapLayerSelectionContentComponent
} from '../../flight-map/view/ng-components/map-layer-selection-content/map-layer-selection-content.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AttributionsContentComponent} from './ng-components/attributions-content/attributions-content.component';
import {SmallMapButtonComponent} from './ng-components/small-map-button/small-map-button.component';
import {AttributionsButtonComponent} from './ng-components/attributions-button/attributions-button-component.component';


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
        MapLayerSelectionButtonComponent,
        MapLayerSelectionContentComponent,
        AttributionsButtonComponent,
        AttributionsButtonComponent,
        AttributionsContentComponent,
        OlOverlayButtonCloseComponent,
        SmallMapButtonComponent,
    ],
    exports: [
        OlMapContainerComponent,
        ZoomButtonsComponent,
        MapLayerSelectionButtonComponent,
        MapLayerSelectionContentComponent,
        AttributionsButtonComponent,
        AttributionsContentComponent,
    ],
    providers: []
})
export class BaseMapViewModule {
}
