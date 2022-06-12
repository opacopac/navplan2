import {NgModule} from '@angular/core';
import {TrackService} from './service/track.service';
import {ITrackService} from './service/i-track.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: ITrackService, useClass: TrackService }
    ]
})
export class TrackDomainModule {
}
