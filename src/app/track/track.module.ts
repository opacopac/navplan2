import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {trackReducer} from './ngrx/track.reducer';
import {TrackEffects} from './ngrx/track.effects';
import {TrackListComponent} from './ng-components/track-list/track-list.component';
import {TrackService} from './rest-service/track.service';
import {TracksPageComponent} from './ng-components/tracks-page/tracks-page.component';
import {BaseMapModule} from '../base-map/base-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('trackState', trackReducer),
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
