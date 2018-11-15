import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {LocationButtonComponent} from './components/location-button/location-button.component';
import {LocationService} from './services/location.service';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {locationReducer} from './location.reducer';
import {LocationEffects} from './location.effects';
import {LocationActions} from './location.actions';
import {LocationState} from './location-state';
import {BaseMapModule} from '../base-map/base-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<LocationState, LocationActions>('locationState', locationReducer),
        EffectsModule.forFeature([LocationEffects]),
        SharedModule,
        BaseMapModule,
    ],
    declarations: [
        LocationButtonComponent,
    ],
    exports: [
        LocationButtonComponent,
    ],
    providers: [
        LocationService,
    ]
})
export class LocationModule {
}
