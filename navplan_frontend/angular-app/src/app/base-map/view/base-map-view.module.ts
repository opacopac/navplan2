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
import {AttributionsButtonComponent} from './ng-components/attributions-button/attributions-button-component.component';
import {CommonViewModule} from '../../common/view/common-view.module';


@NgModule({
    imports: [
        CommonModule,
        BaseMapDomainModule,
        BaseMapStateModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTooltipModule,
        CommonViewModule,
    ],
    declarations: [
        AttributionsButtonComponent,
        AttributionsContentComponent,
        MapLayerSelectionButtonComponent,
        MapLayerSelectionContentComponent,
        OlMapContainerComponent,
        OlOverlayButtonCloseComponent,
        ZoomButtonsComponent,
    ],
    exports: [
        AttributionsButtonComponent,
        AttributionsContentComponent,
        MapLayerSelectionButtonComponent,
        MapLayerSelectionContentComponent,
        OlMapContainerComponent,
        ZoomButtonsComponent,
    ],
    providers: []
})
export class BaseMapViewModule {
}
