import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import {OlOverlayAirportComponent} from './ol-components/ol-overlay-airport/ol-overlay-airport.component';
import {OlOverlayButtonMeteogramComponent} from './ol-components/ol-overlay-button-meteogram/ol-overlay-button-meteogram.component';
import {OlOverlayButtonWebcamComponent} from './ol-components/ol-overlay-button-webcam/ol-overlay-button-webcam.component';
import {OlOverlayGeonameComponent} from './ol-components/ol-overlay-geoname/ol-overlay-geoname.component';
import {OlOverlayMeteogramComponent} from './ol-components/ol-overlay-meteogram/ol-overlay-meteogram.component';
import {OlOverlayNavaidComponent} from './ol-components/ol-overlay-navaid/ol-overlay-navaid.component';
import {OlOverlayReportingpointComponent} from './ol-components/ol-overlay-reportingpoint/ol-overlay-reportingpoint.component';
import {OlOverlayReportingsectorComponent} from './ol-components/ol-overlay-reportingsector/ol-overlay-reportingsector.component';
import {OlOverlayUserpointComponent} from './ol-components/ol-overlay-userpoint/ol-overlay-userpoint.component';
import {OlOverlayWindyiframeComponent} from './ol-components/ol-overlay-windyiframe/ol-overlay-windyiframe.component';
import {SharedModule} from '../shared/shared.module';
import {MapFeaturesModule} from '../map-features/map-features.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {NotamModule} from '../notam/notam.module';
import {NavMapPageComponent} from './components/nav-map-page/nav-map-page.component';
import {OlComponentsContainerComponent} from './components/ol-components-container/ol-components-container.component';
import {OlOverlayContainerComponent} from './components/ol-overlay-container/ol-overlay-container.component';
import {BaseMapModule} from '../base-map/base-map.module';
import {SearchModule} from '../search/search.module';
import {LocationModule} from '../location/location.module';
import {FlightTimerModule} from '../flight-timer/flight-timer.module';
import {TrafficModule} from '../traffic/traffic.module';
import {MetarTafModule} from '../metar-taf/metar-taf.module';
import {OlOverlayButtonAddToRouteComponent} from './ol-components/ol-overlay-button-add-to-route/ol-overlay-button-add-to-route.component';
import {OlOverlayButtonEditUserpointComponent} from './ol-components/ol-overlay-button-edit-userpoint/ol-overlay-button-edit-userpoint.component';
import {OlOverlayButtonEditWaypointComponent} from './ol-components/ol-overlay-button-edit-waypoint/ol-overlay-button-edit-waypoint.component';
import {OlOverlayButtonRemoveAlternateComponent} from './ol-components/ol-overlay-button-remove-alternate/ol-overlay-button-remove-alternate.component';
import {OlOverlayButtonRemoveFromRouteComponent} from './ol-components/ol-overlay-button-remove-from-route/ol-overlay-button-remove-from-route.component';
import {OlOverlayButtonSetAlternateComponent} from './ol-components/ol-overlay-button-set-alternate/ol-overlay-button-set-alternate.component';
import {OlOverlayWaypointComponent} from './ol-components/ol-overlay-waypoint/ol-overlay-waypoint.component';

@NgModule({
    declarations: [
        NavMapPageComponent,
        OlComponentsContainerComponent,
        OlOverlayContainerComponent,
        OlOverlayAirportComponent,
        OlOverlayButtonMeteogramComponent,
        OlOverlayButtonWebcamComponent,
        OlOverlayButtonMeteogramComponent,
        OlOverlayGeonameComponent,
        OlOverlayMeteogramComponent,
        OlOverlayNavaidComponent,
        OlOverlayReportingpointComponent,
        OlOverlayReportingsectorComponent,
        OlOverlayUserpointComponent,
        OlOverlayWindyiframeComponent,
        OlOverlayButtonAddToRouteComponent,
        OlOverlayButtonEditUserpointComponent,
        OlOverlayButtonEditWaypointComponent,
        OlOverlayButtonRemoveAlternateComponent,
        OlOverlayButtonRemoveFromRouteComponent,
        OlOverlayButtonSetAlternateComponent,
        OlOverlayWaypointComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        SharedModule,
        BaseMapModule,
        MapFeaturesModule,
        FlightrouteModule,
        SearchModule,
        LocationModule,
        FlightTimerModule,
        TrafficModule,
        NotamModule,
        MetarTafModule,
    ]
})
export class NavMapModule {
}