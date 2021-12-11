import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackStateModule} from '../track-state/track-state.module';
import {TrackModule} from '../track/track.module';
import {TrackRestModule} from '../track-rest/track-rest.module';
import {TracksPageComponent} from './ng-components/tracks-page/tracks-page.component';
import {TrackListComponent} from './ng-components/track-list/track-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        TrackModule,
        TrackRestModule,
        TrackStateModule,
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
export class TrackViewModule {
}
