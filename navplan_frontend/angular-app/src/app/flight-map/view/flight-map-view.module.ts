import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlightMapPageComponent} from './ng-components/flight-map-page/flight-map-page.component';
import {FlightTimerViewModule} from '../../flight-timer/view/flight-timer-view.module';
import {OlOverlayWaypointComponent} from './ng-components/ol-overlay-waypoint/ol-overlay-waypoint.component';
import {OlMapOverlayComponent} from './ng-components/ol-map-overlay/ol-map-overlay.component';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';
import {AerodromeViewModule} from '../../aerodrome/view/aerodrome-view.module';
import {GeonameViewModule} from '../../geoname/view/geoname-view.module';
import {MeteoSmaViewModule} from '../../meteo-sma/view/meteo-sma-view.module';
import {NotamViewModule} from '../../notam/view/notam-view.module';
import {EnrouteViewModule} from '../../enroute/view/enroute-view.module';
import {WebcamViewModule} from '../../webcam/view/webcam-view.module';
import {TrackViewModule} from '../../track/view/track-view.module';
import {VerticalMapViewModule} from '../../vertical-map/view/vertical-map-view.module';
import {FlightMapStateModule} from '../state/flight-map-state.module';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {UserViewModule} from '../../user/view/user-view.module';
import {TrafficViewModule} from '../../traffic/view/traffic-view.module';
import {SearchViewModule} from '../../search/view/search-view.module';
import {LocationViewModule} from '../../location/location-view/location-view.module';
import {BaseMapViewModule} from '../../base-map/view/base-map-view.module';
import {MeteoDwdViewModule} from '../../meteo-dwd/view/meteo-dwd-view.module';
import {MeteoContainerComponent} from './ng-components/meteo-container/meteo-container.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MeteoGramViewModule} from '../../meteo-gram/view/meteo-gram-view.module';

@NgModule({
    declarations: [
        FlightMapPageComponent,
        OlMapOverlayComponent,
        OlOverlayWaypointComponent,
        MeteoContainerComponent,
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatCardModule,
        AerodromeViewModule,
        BaseMapViewModule,
        EnrouteViewModule,
        FlightMapStateModule,
        FlightTimerViewModule,
        FlightrouteViewModule,
        GeonameViewModule,
        LocationViewModule,
        MetarTafViewModule,
        MeteoSmaViewModule,
        MeteoDwdViewModule,
        MeteoGramViewModule,
        NotamViewModule,
        SearchViewModule,
        TrackViewModule,
        TrafficViewModule,
        UserViewModule,
        VerticalMapViewModule,
        WebcamViewModule,
        MatButtonModule,
    ],
    providers: []
})
export class FlightMapViewModule {
}
