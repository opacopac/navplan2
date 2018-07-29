import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlighttimerComponent} from '../flight-timer/components/flighttimer/flighttimer.component';
import {LocationButtonComponent} from './components/location-button/location-button.component';
import {LocationService} from './services/location.service';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {locationReducer} from './location.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from './location.effects';
import {LocationActions} from './location.actions';
import {LocationState} from './model/location-state';
import {MatButtonModule, MatTooltipModule} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature<LocationState, LocationActions>('locationState', locationReducer),
        EffectsModule.forFeature([LocationEffects]),
        MatTooltipModule,
        MatButtonModule,
    ],
    declarations: [
        FlighttimerComponent,
        LocationButtonComponent,
    ],
    exports: [
        FlighttimerComponent,
        LocationButtonComponent,
    ],
    providers: [
        LocationService,
    ]
})
export class LocationModule {
}
