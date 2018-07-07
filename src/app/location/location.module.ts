import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlighttimerComponent} from './components/flighttimer/flighttimer.component';
import {LocationButtonComponent} from './components/location-button/location-button.component';
import {TracksComponent} from './components/tracks/tracks.component';
import {LocationService} from './services/location/location.service';
import {TrackService} from './services/track/track.service';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        FlighttimerComponent,
        LocationButtonComponent,
        TracksComponent
    ],
    exports: [
        FlighttimerComponent,
        LocationButtonComponent,
        TracksComponent
    ],
    providers: [
        LocationService,
        TrackService
    ]
})
export class LocationModule {
}
