import {NgModule} from '@angular/core';
import {ITrackRepoService} from '../domain/service/i-track-repo.service';
import {RestTrackRepoService} from './service/rest-track-repo.service';
import {TrackDomainModule} from '../domain/track-domain.module';


@NgModule({
    imports: [
        TrackDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: ITrackRepoService, useClass: RestTrackRepoService}
    ]
})
export class TrackRestModule {
}
