import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MapPopupGeonameHeaderComponent
} from './ng-components/map-popup-geoname-header/map-popup-geoname-header.component';
import {
    MapPopupGeonameInfoTabComponent
} from './ng-components/map-popup-geoname-info-tab/map-popup-geoname-info-tab.component';
import {MatCardModule} from '@angular/material/card';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        GeoPhysicsDomainModule,
        GeoPhysicsViewModule,
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
