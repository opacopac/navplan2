import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlightMapPageComponent} from './ng-components/flight-map-page/flight-map-page.component';
import {MapPopupWaypointComponent} from './ng-components/map-popup-waypoint/map-popup-waypoint.component';
import {MapPopupComponent} from './ng-components/map-popup/map-popup.component';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';
import {GeonameViewModule} from '../../geoname/view/geoname-view.module';
import {MeteoSmaViewModule} from '../../meteo-sma/view/meteo-sma-view.module';
import {NotamViewModule} from '../../notam/view/notam-view.module';
import {NavaidViewModule} from '../../navaid/view/navaid-view.module';
import {WebcamViewModule} from '../../webcam/view/webcam-view.module';
import {TrackViewModule} from '../../track/view/track-view.module';
import {VerticalMapViewModule} from '../../vertical-map/view/vertical-map-view.module';
import {FlightMapStateModule} from '../state/flight-map-state.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {UserViewModule} from '../../user/view/user-view.module';
import {TrafficViewModule} from '../../traffic/view/traffic-view.module';
import {SearchViewModule} from '../../search/view/search-view.module';
import {BaseMapViewModule} from '../../base-map/view/base-map-view.module';
import {MeteoDwdViewModule} from '../../meteo-dwd/view/meteo-dwd-view.module';
import {MeteoContainerComponent} from './ng-components/meteo-container/meteo-container.component';
import {MatButtonModule} from '@angular/material/button';
import {MeteoGramViewModule} from '../../meteo-gram/view/meteo-gram-view.module';
import {FullScreenButtonComponent} from './ng-components/full-screen-button/full-screen-button.component';
import {
    MapPopupButtonEditUserpointComponent
} from './ng-components/map-popup-button-edit-userpoint/map-popup-button-edit-userpoint.component';
import {
    MapPopupWaypointButtonContainerComponent
} from './ng-components/map-popup-waypoint-button-container/map-popup-waypoint-button-container.component';
import {
    MapPopupWaypointButtonAddToRouteComponent
} from './ng-components/map-popup-waypoint-button-add-to-route/map-popup-waypoint-button-add-to-route.component';
import {
    MapPopupButtonEditWaypointComponent
} from './ng-components/map-popup-waypoint-button-edit-waypoint/map-popup-button-edit-waypoint.component';
import {
    MapPopupWaypointButtonRemoveAlternateComponent
} from './ng-components/map-popup-waypoint-button-remove-alternate/map-popup-waypoint-button-remove-alternate.component';
import {
    MapPopupWaypointButtonRemoveFromRouteComponent
} from './ng-components/map-popup-waypoint-button-remove-from-route/map-popup-waypoint-button-remove-from-route.component';
import {
    MapPopupWaypointButtonSetAlternateComponent
} from './ng-components/map-popup-waypoint-button-set-alternate/map-popup-waypoint-button-set-alternate.component';
import {MapPopupWaypointHeaderComponent} from './ng-components/map-popup-waypoint-header/map-popup-waypoint-header.component';
import {MapPopupWaypointInfoTabComponent} from './ng-components/map-popup-waypoint-info-tab/map-popup-waypoint-info-tab.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {PlanWaypointsViewModule} from '../../plan-waypoints/view/plan-waypoints-view.module';
import {LocationButtonComponent} from '../../location/location-view/ng-components/location-button/location-button.component';
import {FlightMapDomainModule} from '../domain/flight-map-domain.module';
import {
    MapPopupAirportHeaderComponent
} from '../../aerodrome/view/ng-components/map-popup-airport-header/map-popup-airport-header.component';
import {
    MapPopupAirportInfoTabComponent
} from '../../aerodrome/view/ng-components/map-popup-airport-info-tab/map-popup-airport-info-tab.component';
import {
    MapPopupAirportRunwayTabComponent
} from '../../aerodrome/view/ng-components/map-popup-airport-runway-tab/map-popup-airport-runway-tab.component';
import {
    MapPopupAirportRadioTabComponent
} from '../../aerodrome/view/ng-components/map-popup-airport-radio-tab/map-popup-airport-radio-tab.component';
import {
    MapPopupAirportChartTabComponent
} from '../../aerodrome-charts/view/ng-components/map-popup-airport-chart-tab/map-popup-airport-chart-tab.component';
import {
    MapPopupReportingpointHeaderComponent
} from '../../aerodrome-reporting/view/ng-components/map-popup-reportingpoint-header/map-popup-reportingpoint-header.component';
import {
    MapPopupReportingpointInfoTabComponent
} from '../../aerodrome-reporting/view/ng-components/map-popup-reportingpoint-info-tab/map-popup-reportingpoint-info-tab.component';
import {
    MapPopupReportingsectorHeaderComponent
} from '../../aerodrome-reporting/view/ng-components/map-popup-reportingsector-header/map-popup-reportingsector-header.component';
import {
    MapPopupReportingsectorInfoTabComponent
} from '../../aerodrome-reporting/view/ng-components/map-popup-reportingsector-info-tab/map-popup-reportingsector-info-tab.component';
import {
    MapOverlayAirspaceStructureComponent
} from '../../airspace/view/ng-components/map-overlay-airspace-structure/map-overlay-airspace-structure.component';
import {AttributionsButtonComponent} from '../../base-map/view/ng-components/attributions-button/attributions-button-component.component';
import {AttributionsContentComponent} from '../../base-map/view/ng-components/attributions-content/attributions-content.component';
import {OlMapContainerComponent} from '../../base-map/view/ng-components/ol-map-container/ol-map-container.component';
import {ZoomButtonsComponent} from '../../base-map/view/ng-components/zoom-buttons/zoom-buttons.component';
import {MapLayerSelectionButtonComponent} from './ng-components/map-layer-selection-button/map-layer-selection-button.component';
import {MapLayerSelectionContentComponent} from './ng-components/map-layer-selection-content/map-layer-selection-content.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MiniFabButtonComponent} from '../../common/view/ng-components/mini-fab-button/mini-fab-button.component';
import {StatusButtonComponent} from '../../common/view/ng-components/status-button/status-button.component';
import {FlighttimerComponent} from '../../flight-timer/view/ng-components/flighttimer/flighttimer.component';
import {MapOverlayPositionComponent} from '../../geo-physics/view/ng-components/map-overlay-position/map-overlay-position.component';
import {MapOverlayVariationComponent} from '../../geo-physics/view/ng-components/map-overlay-variation/map-overlay-variation.component';
import {MapPopupGeonameHeaderComponent} from '../../geoname/view/ng-components/map-popup-geoname-header/map-popup-geoname-header.component';
import {
    MapPopupGeonameInfoTabComponent
} from '../../geoname/view/ng-components/map-popup-geoname-info-tab/map-popup-geoname-info-tab.component';

@NgModule({
    declarations: [
        FlightMapPageComponent,
        FullScreenButtonComponent,
        MapPopupComponent,
        MapPopupWaypointComponent,
        MeteoContainerComponent,
        MapPopupButtonEditUserpointComponent,
        MapPopupWaypointButtonContainerComponent,
        MapPopupWaypointButtonAddToRouteComponent,
        MapPopupButtonEditWaypointComponent,
        MapPopupWaypointButtonRemoveAlternateComponent,
        MapPopupWaypointButtonRemoveFromRouteComponent,
        MapPopupWaypointButtonSetAlternateComponent,
        MapPopupWaypointHeaderComponent,
        MapPopupWaypointInfoTabComponent,
        MapLayerSelectionButtonComponent,
        MapLayerSelectionContentComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatCardModule,
        BaseMapViewModule,
        CommonModule,
        FlightMapDomainModule,
        FlightMapStateModule,
        PlanWaypointsViewModule,
        GeonameViewModule,
        MatButtonModule,
        MatTabsModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MetarTafViewModule,
        MeteoSmaViewModule,
        MeteoDwdViewModule,
        MeteoGramViewModule,
        NavaidViewModule,
        NotamViewModule,
        SearchViewModule,
        TrackViewModule,
        TrafficViewModule,
        UserViewModule,
        VerticalMapViewModule,
        WebcamViewModule,
        LocationButtonComponent,
        MapPopupAirportHeaderComponent,
        MapPopupAirportInfoTabComponent,
        MapPopupAirportRunwayTabComponent,
        MapPopupAirportRadioTabComponent,
        MapPopupAirportChartTabComponent,
        MapPopupReportingpointHeaderComponent,
        MapPopupReportingpointInfoTabComponent,
        MapPopupReportingsectorHeaderComponent,
        MapPopupReportingsectorInfoTabComponent,
        MapOverlayAirspaceStructureComponent,
        AttributionsButtonComponent,
        AttributionsContentComponent,
        OlMapContainerComponent,
        ZoomButtonsComponent,
        MiniFabButtonComponent,
        StatusButtonComponent,
        FlighttimerComponent,
        MapOverlayPositionComponent,
        MapOverlayVariationComponent,
        MapPopupGeonameHeaderComponent,
        MapPopupGeonameInfoTabComponent
    ],
    providers: []
})
export class FlightMapViewModule {
}
