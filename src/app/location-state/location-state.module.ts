import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {locationReducer} from './ngrx/location.reducer';
import {LocationEffects} from './ngrx/location.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('locationState', locationReducer),
        EffectsModule.forFeature([LocationEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class LocationStateModule {
}
