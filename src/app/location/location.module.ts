import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlighttimerComponent} from './components/flighttimer/flighttimer.component';
import {LocationButtonComponent} from './components/location-button/location-button.component';
import {TrackListComponent} from './components/track-list/track-list.component';
import {LocationService} from './services/location/location.service';
import {TrackService} from './services/track/track.service';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {locationReducer} from './location.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from './location.effects';
import {LocationActions} from './location.actions';
import {LocationState} from './model/location-state';
import {MatButtonModule, MatTableModule, MatTooltipModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature<LocationState, LocationActions>('locationState', locationReducer),
        EffectsModule.forFeature([LocationEffects]),
        MatTooltipModule,
        MatTableModule,
        MatButtonModule,
    ],
    declarations: [
        FlighttimerComponent,
        LocationButtonComponent,
        TrackListComponent
    ],
    exports: [
        FlighttimerComponent,
        LocationButtonComponent,
        TrackListComponent
    ],
    providers: [
        LocationService,
        TrackService
    ]
})
export class LocationModule {
}
