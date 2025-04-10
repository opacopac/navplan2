import {NgModule} from '@angular/core';
import {TrackStateModule} from '../state/track-state.module';
import {TrackDomainModule} from '../domain/track-domain.module';


@NgModule({
    imports: [
        TrackDomainModule,
        TrackStateModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrackViewModule {
}
