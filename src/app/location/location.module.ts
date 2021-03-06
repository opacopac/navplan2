import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {LocationButtonComponent} from './ng-components/location-button/location-button.component';
import {LocationService} from './domain-service/location.service';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {locationReducer} from './ngrx/location.reducer';
import {LocationEffects} from './ngrx/location.effects';
import {BaseMapModule} from '../base-map/base-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('locationState', locationReducer),
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
