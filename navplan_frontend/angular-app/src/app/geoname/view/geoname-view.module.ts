import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapPopupGeonameHeaderComponent} from './ng-components/map-popup-geoname-header/map-popup-geoname-header.component';
import {MapPopupGeonameInfoTabComponent} from './ng-components/map-popup-geoname-info-tab/map-popup-geoname-info-tab.component';
import {MatCardModule} from '@angular/material/card';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {MapOverlayElevationComponent} from '../../geo-physics/view/ng-components/map-overlay-elevation/map-overlay-elevation.component';
import {MapOverlayPositionComponent} from '../../geo-physics/view/ng-components/map-overlay-position/map-overlay-position.component';
import {MapOverlayVariationComponent} from '../../geo-physics/view/ng-components/map-overlay-variation/map-overlay-variation.component';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        GeoPhysicsDomainModule,
        MapOverlayElevationComponent,
        MapOverlayPositionComponent,
        MapOverlayVariationComponent,
    ],
    declarations: [
        MapPopupGeonameHeaderComponent,
        MapPopupGeonameInfoTabComponent
    ],
    exports: [
        MapPopupGeonameHeaderComponent,
        MapPopupGeonameInfoTabComponent
    ],
})
export class GeonameViewModule {
}
