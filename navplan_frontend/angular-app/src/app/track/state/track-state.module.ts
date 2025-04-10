import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {trackReducer} from './ngrx/track.reducer';
import {TrackEffects} from './ngrx/track.effects';
import {TrackDomainModule} from '../domain/track-domain.module';
import {TrackRestModule} from '../rest/track-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('trackState', trackReducer),
        EffectsModule.forFeature([TrackEffects]),
        TrackDomainModule,
        TrackRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrackStateModule {
}
