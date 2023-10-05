import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackStateModule} from '../state/track-state.module';
import {TrackDomainModule} from '../domain/track-domain.module';
import {TrackRestModule} from '../rest/track-rest.module';
import {TracksPageComponent} from './ng-components/tracks-page/tracks-page.component';
import {TrackListComponent} from './ng-components/track-list/track-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        TrackDomainModule,
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
