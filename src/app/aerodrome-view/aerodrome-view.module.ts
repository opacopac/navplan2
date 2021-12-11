import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OlOverlayAirportHeaderComponent} from './ng-components/ol-overlay-airport-header/ol-overlay-airport-header.component';
import {OlOverlayAirportChartTabComponent} from './ng-components/ol-overlay-airport-chart-tab/ol-overlay-airport-chart-tab.component';
import {OlOverlayAirportInfoTabComponent} from './ng-components/ol-overlay-airport-info-tab/ol-overlay-airport-info-tab.component';
import {OlOverlayAirportRunwayTabComponent} from './ng-components/ol-overlay-airport-runway-tab/ol-overlay-airport-runway-tab.component';
import {OlOverlayAirportRadioTabComponent} from './ng-components/ol-overlay-airport-radio-tab/ol-overlay-airport-radio-tab.component';
import {OlOverlayAirportMetarTafTabComponent} from './ng-components/ol-overlay-airport-metar-taf-tab/ol-overlay-airport-metar-taf-tab.component';
import {OlOverlayReportingpointHeaderComponent} from './ng-components/ol-overlay-reportingpoint-header/ol-overlay-reportingpoint-header.component';
import {OlOverlayReportingpointInfoTabComponent} from './ng-components/ol-overlay-reportingpoint-info-tab/ol-overlay-reportingpoint-info-tab.component';
import {OlOverlayReportingsectorHeaderComponent} from './ng-components/ol-overlay-reportingsector-header/ol-overlay-reportingsector-header.component';
import {OlOverlayReportingsectorInfoTabComponent} from './ng-components/ol-overlay-reportingsector-info-tab/ol-overlay-reportingsector-info-tab.component';
import {AerodromeModule} from '../aerodrome/aerodrome.module';
import {AerodromeStateModule} from '../aerodrome-state/aerodrome-state.module';
import {AerodromeRestModule} from '../aerodrome-rest/aerodrome-rest.module';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {GeoPhysicsModule} from '../geo-physics/geo-physics.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        AerodromeModule,
        AerodromeRestModule,
        AerodromeStateModule,
        GeoPhysicsModule,
    ],
    declarations: [
        OlOverlayAirportHeaderComponent,
        OlOverlayAirportInfoTabComponent,
        OlOverlayAirportRunwayTabComponent,
        OlOverlayAirportRadioTabComponent,
        OlOverlayAirportChartTabComponent,
        OlOverlayAirportMetarTafTabComponent,
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
        OlOverlayAirportMetarTafTabComponent,
        OlOverlayReportingpointHeaderComponent,
        OlOverlayReportingpointInfoTabComponent,
        OlOverlayReportingsectorHeaderComponent,
        OlOverlayReportingsectorInfoTabComponent,
    ],
    providers: [
    ]
})
export class AerodromeViewModule {}
