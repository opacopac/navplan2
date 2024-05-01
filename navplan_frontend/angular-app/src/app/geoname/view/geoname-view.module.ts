import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    OlOverlayGeonameHeaderComponent
} from './ng-components/ol-overlay-geoname-header/ol-overlay-geoname-header.component';
import {
    OlOverlayGeonameInfoTabComponent
} from './ng-components/ol-overlay-geoname-info-tab/ol-overlay-geoname-info-tab.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        GeoPhysicsDomainModule,
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
