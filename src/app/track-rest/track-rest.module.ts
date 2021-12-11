import {NgModule} from '@angular/core';
import {ITrackRepoService} from '../track/domain-service/i-track-repo.service';
import {RestTrackRepoService} from './rest-service/rest-track-repo.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: ITrackRepoService, useClass: RestTrackRepoService }
    ]
})
export class TrackRestModule {
}
