import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OlOverlayGeonameHeaderComponent} from './ng-components/ol-overlay-geoname-header/ol-overlay-geoname-header.component';
import {OlOverlayGeonameInfoTabComponent} from './ng-components/ol-overlay-geoname-info-tab/ol-overlay-geoname-info-tab.component';
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
