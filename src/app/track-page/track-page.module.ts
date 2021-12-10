import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {TracksPageComponent} from './ng-components/tracks-page/tracks-page.component';
import {TrackListComponent} from './ng-components/track-list/track-list.component';
import {TrackModule} from '../track/track.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TrackModule
    ],
    declarations: [
        TracksPageComponent,
        TrackListComponent
    ],
    exports: [
        TracksPageComponent,
    ],
    providers: [
    ]
})
export class TrackPageModule {
}
