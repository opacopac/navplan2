import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {TrackState} from './domain/track-state';
import {TrackActions} from './ngrx/track.actions';
import {trackReducer} from './ngrx/track.reducer';
import {TrackEffects} from './ngrx/track.effects';
import {TrackListComponent} from './components/track-list/track-list.component';
import {TrackService} from './services/track.service';
import {TracksPageComponent} from './components/tracks-page/tracks-page.component';
import {OlMapModule} from '../ol-map/ol-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<TrackState, TrackActions>('trackState', trackReducer),
        EffectsModule.forFeature([TrackEffects]),
        SharedModule,
        OlMapModule,
    ],
    declarations: [
        TracksPageComponent,
        TrackListComponent
    ],
    exports: [
        TracksPageComponent,
    ],
    providers: [
        TrackService
    ]
})
export class TrackModule {
}
