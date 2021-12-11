import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {OlOverlayMeteogramComponent} from './ng-components/ol-overlay-meteogram/ol-overlay-meteogram.component';
import {OlOverlayWindyiframeComponent} from './ng-components/ol-overlay-windyiframe/ol-overlay-windyiframe.component';
import {SharedModule} from '../common/shared.module';
import {FlightMapPageComponent} from './ng-components/flight-map-page/flight-map-page.component';
import {BaseMapModule} from '../base-map/base-map.module';
import {SearchModule} from '../search/search.module';
import {LocationModule} from '../location/location.module';
import {FlightTimerModule} from '../flight-timer/flight-timer.module';
import {TrafficModule} from '../traffic/traffic.module';
import {OlOverlayWaypointComponent} from './ng-components/ol-overlay-waypoint/ol-overlay-waypoint.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {flightMapReducer} from './ngrx/flight-map.reducer';
import {FlightMapEffects} from './ngrx/flight-map.effects';
import {MatIconModule} from '@angular/material/icon';
import {OlMapOverlayComponent} from './ng-components/ol-map-overlay/ol-map-overlay.component';
import {UserModule} from '../user/user.module';
import {FlightMapStateService} from './ngrx/flight-map-state.service';
import {MetarTafViewModule} from '../metar-taf-view/metar-taf-view.module';
import {FlightrouteViewModule} from '../flightroute-view/flightroute-view.module';
import {AerodromeViewModule} from '../aerodrome-view/aerodrome-view.module';
import {GeonameViewModule} from '../geoname-view/geoname-view.module';
import {MeteoSmaViewModule} from '../meteo-sma-view/meteo-sma-view.module';
import {NotamViewModule} from '../notam-view/notam-view.module';
import {EnrouteViewModule} from '../enroute-view/enroute-view.module';
import {WebcamViewModule} from '../webcam-view/webcam-view.module';
import {TrackViewModule} from '../track-view/track-view.module';
import {VerticalMapViewModule} from '../vertical-map-view/vertical-map-view.module';

@NgModule({
    declarations: [
        FlightMapPageComponent,
        OlMapOverlayComponent,
        OlOverlayMeteogramComponent,
        OlOverlayWindyiframeComponent,
        OlOverlayWaypointComponent,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('flightMapState', flightMapReducer),
        EffectsModule.forFeature([FlightMapEffects]),
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        SharedModule,
        BaseMapModule,
        SearchModule,
        LocationModule,
        FlightTimerModule,
        TrafficModule,
        UserModule,
        AerodromeViewModule,
        EnrouteViewModule,
        FlightrouteViewModule,
        GeonameViewModule,
        MetarTafViewModule,
        MeteoSmaViewModule,
        NotamViewModule,
        TrackViewModule,
        VerticalMapViewModule,
        WebcamViewModule,
    ],
    providers: [
        FlightMapStateService,
    ]
})
export class FlightMapModule {
}
