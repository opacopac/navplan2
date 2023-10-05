import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {baseMapReducer} from './ngrx/base-map.reducer';
import {BaseMapEffects} from './ngrx/base-map.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('baseMapState', baseMapReducer),
        EffectsModule.forFeature([BaseMapEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class BaseMapStateModule {}
