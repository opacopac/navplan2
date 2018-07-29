import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MatButtonModule, MatTableModule, MatTooltipModule} from '@angular/material';
import {TrackState} from './model/track-state';
import {TrackActions} from './track.actions';
import {trackReducer} from './track.reducer';
import {TrackEffects} from './track.effects';
import {TrackListComponent} from './components/track-list/track-list.component';
import {TrackService} from './services/track.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature<TrackState, TrackActions>('trackState', trackReducer),
        EffectsModule.forFeature([TrackEffects]),
        MatTooltipModule,
        MatTableModule,
        MatButtonModule,
    ],
    declarations: [
        TrackListComponent
    ],
    exports: [
        TrackListComponent
    ],
    providers: [
        TrackService
    ]
})
export class TrackModule {
}
