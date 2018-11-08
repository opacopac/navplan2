import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapfeaturesService} from './services/mapfeatures.service';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {mapFeaturesReducer} from './map-features.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MapFeaturesEffects} from './map-features.effects';
import {MapFeaturesActions} from './map-features.actions';
import {MapFeaturesState} from './map-features-state';
import {BaseMapModule} from '../base-map/base-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<MapFeaturesState, MapFeaturesActions>('mapFeaturesState', mapFeaturesReducer),
        EffectsModule.forFeature([MapFeaturesEffects]),
        SharedModule,
        BaseMapModule,
    ],
    declarations: [

    ],
    providers: [
        MapfeaturesService
    ]
})
export class MapFeaturesModule {}
