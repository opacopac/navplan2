import {NgModule} from '@angular/core';
import {ITrackRepoService} from '../domain/service/i-track-repo.service';
import {RestTrackRepoService} from './service/rest-track-repo.service';


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
