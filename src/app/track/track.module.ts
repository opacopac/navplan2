import {NgModule} from '@angular/core';
import {TrackService} from './domain-service/track.service';
import {ITrackService} from './domain-service/i-track.service';


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
export class TrackModule {
}
