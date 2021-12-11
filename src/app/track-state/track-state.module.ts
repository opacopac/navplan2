import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {trackReducer} from './ngrx/track.reducer';
import {TrackEffects} from './ngrx/track.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('trackState', trackReducer),
        EffectsModule.forFeature([TrackEffects]),
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
