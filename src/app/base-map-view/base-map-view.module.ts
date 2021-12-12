import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {OlMapContainerComponent} from './ng-components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from './ng-components/zoom-buttons/zoom-buttons.component';
import {BaseMapModule} from '../base-map/base-map.module';
import {BaseMapStateModule} from '../base-map-state/base-map-state.module';
import {OlOverlayButtonCloseComponent} from './ng-components/ol-overlay-button-close/ol-overlay-button-close.component';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        BaseMapModule,
        BaseMapStateModule,
    ],
    declarations: [
        OlMapContainerComponent,
        ZoomButtonsComponent,
        OlOverlayButtonCloseComponent,
    ],
    exports: [
        OlMapContainerComponent,
        ZoomButtonsComponent,
    ],
    providers: [
    ]
})
export class BaseMapViewModule {}
