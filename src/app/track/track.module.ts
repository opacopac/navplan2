import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {TrackState} from './domain-model/track-state';
import {TrackActions} from './ngrx/track.actions';
import {trackReducer} from './ngrx/track.reducer';
import {TrackEffects} from './ngrx/track.effects';
import {TrackListComponent} from './ng-components/track-list/track-list.component';
import {TrackService} from './rest-service/track.service';
import {TracksPageComponent} from './ng-components/tracks-page/tracks-page.component';
import {BaseMapModule} from '../base-map/base-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<TrackState, TrackActions>('trackState', trackReducer),
        EffectsModule.forFeature([TrackEffects]),
        SharedModule,
        BaseMapModule,
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
