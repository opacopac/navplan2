import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {OlOverlayGeonameHeaderComponent} from './ng-components/ol-overlay-geoname-header/ol-overlay-geoname-header.component';
import {OlOverlayGeonameInfoTabComponent} from './ng-components/ol-overlay-geoname-info-tab/ol-overlay-geoname-info-tab.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        OlOverlayGeonameHeaderComponent,
        OlOverlayGeonameInfoTabComponent
    ],
    exports: [
        OlOverlayGeonameHeaderComponent,
        OlOverlayGeonameInfoTabComponent
    ],
})
export class FlightMapGeonameModule {
}
