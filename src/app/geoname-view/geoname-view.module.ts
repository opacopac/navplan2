import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OlOverlayGeonameHeaderComponent} from './ng-components/ol-overlay-geoname-header/ol-overlay-geoname-header.component';
import {OlOverlayGeonameInfoTabComponent} from './ng-components/ol-overlay-geoname-info-tab/ol-overlay-geoname-info-tab.component';
import {MatCardModule} from '@angular/material/card';
import {GeoPhysicsModule} from '../geo-physics/geo-physics.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        GeoPhysicsModule,
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
export class GeonameViewModule {
}
