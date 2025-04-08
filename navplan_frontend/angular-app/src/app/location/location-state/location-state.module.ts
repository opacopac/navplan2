import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {locationReducer} from './ngrx/location.reducer';
import {LocationEffects} from './ngrx/location.effects';
import {LocationDomainModule} from '../location-domain/location-domain.module';


@NgModule({
    imports: [
        StoreModule.forFeature('locationState', locationReducer),
        EffectsModule.forFeature([LocationEffects]),
        LocationDomainModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class LocationStateModule {
}
