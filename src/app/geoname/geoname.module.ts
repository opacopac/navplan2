import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OlOverlayGeonameHeaderComponent} from '../flight-map/ol-components/ol-overlay-geoname-header/ol-overlay-geoname-header.component';
import {OlOverlayGeonameInfoTabComponent} from '../flight-map/ol-components/ol-overlay-geoname-info-tab/ol-overlay-geoname-info-tab.component';
import {SharedModule} from '../common/shared.module';

@NgModule({
    declarations: [
        OlOverlayGeonameHeaderComponent,
        OlOverlayGeonameInfoTabComponent
    ],
    exports: [
        OlOverlayGeonameHeaderComponent,
        OlOverlayGeonameInfoTabComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ]
})
export class GeonameModule {
}
