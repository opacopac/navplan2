import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    OlOverlayAirportHeaderComponent
} from './ng-components/ol-overlay-airport-header/ol-overlay-airport-header.component';
import {
    OlOverlayAirportChartTabComponent
} from './ng-components/ol-overlay-airport-chart-tab/ol-overlay-airport-chart-tab.component';
import {
    OlOverlayAirportInfoTabComponent
} from './ng-components/ol-overlay-airport-info-tab/ol-overlay-airport-info-tab.component';
import {
    OlOverlayAirportRunwayTabComponent
} from './ng-components/ol-overlay-airport-runway-tab/ol-overlay-airport-runway-tab.component';
import {
    OlOverlayAirportRadioTabComponent
} from './ng-components/ol-overlay-airport-radio-tab/ol-overlay-airport-radio-tab.component';
import {
    OlOverlayReportingpointHeaderComponent
} from './ng-components/ol-overlay-reportingpoint-header/ol-overlay-reportingpoint-header.component';
import {
    OlOverlayReportingpointInfoTabComponent
} from './ng-components/ol-overlay-reportingpoint-info-tab/ol-overlay-reportingpoint-info-tab.component';
import {
    OlOverlayReportingsectorHeaderComponent
} from './ng-components/ol-overlay-reportingsector-header/ol-overlay-reportingsector-header.component';
import {
    OlOverlayReportingsectorInfoTabComponent
} from './ng-components/ol-overlay-reportingsector-info-tab/ol-overlay-reportingsector-info-tab.component';
import {AerodromeDomainModule} from '../domain/aerodrome-domain.module';
import {AerodromeStateModule} from '../state/aerodrome-state.module';
import {AerodromeRestModule} from '../rest/aerodrome-rest.module';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        AerodromeDomainModule,
        AerodromeRestModule,
        AerodromeStateModule,
        GeoPhysicsDomainModule,
        MetarTafViewModule,
    ],
    declarations: [
        OlOverlayAirportHeaderComponent,
        OlOverlayAirportInfoTabComponent,
        OlOverlayAirportRunwayTabComponent,
        OlOverlayAirportRadioTabComponent,
        OlOverlayAirportChartTabComponent,
        OlOverlayReportingpointHeaderComponent,
        OlOverlayReportingpointInfoTabComponent,
        OlOverlayReportingsectorHeaderComponent,
        OlOverlayReportingsectorInfoTabComponent,
    ],
    exports: [
        OlOverlayAirportHeaderComponent,
        OlOverlayAirportInfoTabComponent,
        OlOverlayAirportRunwayTabComponent,
        OlOverlayAirportRadioTabComponent,
        OlOverlayAirportChartTabComponent,
        OlOverlayReportingpointHeaderComponent,
        OlOverlayReportingpointInfoTabComponent,
        OlOverlayReportingsectorHeaderComponent,
        OlOverlayReportingsectorInfoTabComponent,
    ],
    providers: [
    ]
})
export class AerodromeViewModule {}
