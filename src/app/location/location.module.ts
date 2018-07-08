import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlighttimerComponent} from './components/flighttimer/flighttimer.component';
import {LocationButtonComponent} from './components/location-button/location-button.component';
import {TracksComponent} from './components/tracks/tracks.component';
import {LocationService} from './services/location/location.service';
import {TrackService} from './services/track/track.service';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {locationReducer} from './location.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from './location.effects';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('locationState', locationReducer),
        EffectsModule.forFeature([LocationEffects])
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
