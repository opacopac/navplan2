import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {AerodromeReportingDomainModule} from './domain/aerodrome-reporting-domain.module';
import {AerodromeReportingRestModule} from './rest/aerodrome-reporting-rest.module';
import {AerodromeReportingStateModule} from './state/aerodrome-reporting-state.module';
import {GeoPhysicsDomainModule} from '../geo-physics/domain/geo-physics-domain.module';
import {GeoPhysicsViewModule} from '../geo-physics/view/geo-physics-view.module';
import {MetarTafViewModule} from '../metar-taf/view/metar-taf-view.module';
import {
    MapPopupReportingpointHeaderComponent
} from './view/ng-components/map-popup-reportingpoint-header/map-popup-reportingpoint-header.component';
import {
    MapPopupReportingpointInfoTabComponent
} from './view/ng-components/map-popup-reportingpoint-info-tab/map-popup-reportingpoint-info-tab.component';
import {
    MapPopupReportingsectorHeaderComponent
} from './view/ng-components/map-popup-reportingsector-header/map-popup-reportingsector-header.component';
import {
    MapPopupReportingsectorInfoTabComponent
} from './view/ng-components/map-popup-reportingsector-info-tab/map-popup-reportingsector-info-tab.component';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        AerodromeReportingDomainModule,
        AerodromeReportingRestModule,
        AerodromeReportingStateModule,
        GeoPhysicsDomainModule,
        GeoPhysicsViewModule,
        MetarTafViewModule,
        MatIconModule,
    ],
    declarations: [
        MapPopupReportingpointHeaderComponent,
        MapPopupReportingpointInfoTabComponent,
        MapPopupReportingsectorHeaderComponent,
        MapPopupReportingsectorInfoTabComponent,
    ],
    exports: [
        MapPopupReportingpointHeaderComponent,
        MapPopupReportingpointInfoTabComponent,
        MapPopupReportingsectorHeaderComponent,
        MapPopupReportingsectorInfoTabComponent,
    ],
    providers: []
})
export class AerodromeReportingViewModule {
}
