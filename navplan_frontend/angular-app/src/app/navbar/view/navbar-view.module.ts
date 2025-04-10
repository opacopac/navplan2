import {NgModule} from '@angular/core';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';
import {AircraftViewModule} from '../../aircraft/view/aircraft-view.module';
import {TrackViewModule} from '../../track/view/track-view.module';
import {UserViewModule} from '../../user/view/user-view.module';


@NgModule({
    imports: [
        AircraftViewModule,
        FlightrouteViewModule,
        TrackViewModule,
        UserViewModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class NavbarViewModule {
}
