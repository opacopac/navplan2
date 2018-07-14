import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapfeaturesService} from './services/mapfeatures.service';
import {MapOverlayAirportComponent} from './components/map-overlay-airport/map-overlay-airport.component';
import {MapOverlayGeonameComponent} from './components/map-overlay-geoname/map-overlay-geoname.component';
import {MapOverlayNavaidComponent} from './components/map-overlay-navaid/map-overlay-navaid.component';
import {MapOverlayReportingpointComponent} from './components/map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import {MapOverlayReportingsectorComponent} from './components/map-overlay-reportingsector/map-overlay-reportingsector.component';
import {MapOverlayUserpointComponent} from './components/map-overlay-userpoint/map-overlay-userpoint.component';
import {SharedModule} from '../shared/shared.module';
import {MapOverlayButtonMeteogramComponent} from './components/map-overlay-button-meteogram/map-overlay-button-meteogram.component';
import {MapOverlayWindyiframeComponent} from './components/map-overlay-windyiframe/map-overlay-windyiframe.component';
import {MapOverlayButtonWebcamComponent} from './components/map-overlay-button-webcam/map-overlay-button-webcam.component';
import {NotamModule} from '../notam/notam.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {StoreModule} from '@ngrx/store';
import {mapFeaturesReducer} from './map-features.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MapFeaturesEffects} from './map-features.effects';
import {MapFeaturesActions} from './map-features.actions';
import {MapFeaturesState} from './model/map-features-state';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NotamModule,
        FlightrouteModule,
        StoreModule.forFeature<MapFeaturesState, MapFeaturesActions>('mapFeaturesState', mapFeaturesReducer),
        EffectsModule.forFeature([MapFeaturesEffects])
    ],
    declarations: [
        MapOverlayAirportComponent,
        MapOverlayButtonMeteogramComponent,
        MapOverlayButtonWebcamComponent,
        MapOverlayButtonMeteogramComponent,
        MapOverlayGeonameComponent,
        MapOverlayNavaidComponent,
        MapOverlayReportingpointComponent,
        MapOverlayReportingsectorComponent,
        MapOverlayUserpointComponent,
        MapOverlayWindyiframeComponent,
    ],
    exports: [
        MapOverlayAirportComponent,
        MapOverlayButtonMeteogramComponent,
        MapOverlayButtonWebcamComponent,
        MapOverlayButtonMeteogramComponent,
        MapOverlayGeonameComponent,
        MapOverlayNavaidComponent,
        MapOverlayReportingpointComponent,
        MapOverlayReportingsectorComponent,
        MapOverlayUserpointComponent,
        MapOverlayWindyiframeComponent,
    ],
    providers: [
        MapfeaturesService
    ]
})
export class MapFeaturesModule {}
