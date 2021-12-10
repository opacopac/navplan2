import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {trackReducer} from './ngrx/track.reducer';
import {TrackEffects} from './ngrx/track.effects';
import {TrackModule} from '../track/track.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('trackState', trackReducer),
        EffectsModule.forFeature([TrackEffects]),
        SharedModule,
        TrackModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class TrackStateModule {
}
