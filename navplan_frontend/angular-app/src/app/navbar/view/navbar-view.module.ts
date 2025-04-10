import {NgModule} from '@angular/core';
import {UserStateModule} from '../../user/state/user-state.module';
import {AircraftStateModule} from '../../aircraft/state/aircraft-state.module';
import {FlightrouteStateModule} from '../../flightroute/state/flightroute-state.module';
import {TrackStateModule} from '../../track/state/track-state.module';


@NgModule({
    imports: [
        AircraftStateModule,
        FlightrouteStateModule,
        TrackStateModule,
        UserStateModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class NavbarViewModule {
}
