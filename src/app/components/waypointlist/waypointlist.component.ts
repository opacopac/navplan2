import {Component, OnDestroy, OnInit} from '@angular/core';
import {Waypointtype} from '../../model/waypoint';
import {ButtonColor, ButtonSize} from '../buttons/button-base.directive';
import {SessionService} from '../../services/session/session.service';
import {Sessioncontext} from '../../model/session/sessioncontext';
import {Waypoint2} from '../../model/flightroute/waypoint2';
import {Flightroute2} from '../../model/flightroute/flightroute2';


@Component({
    selector: 'app-waypointlist',
    templateUrl: './waypointlist.component.html',
    styleUrls: ['./waypointlist.component.css']
})
export class WaypointlistComponent implements OnInit, OnDestroy {
    public Waypointtype = Waypointtype;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public session: Sessioncontext;


    constructor(
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    // region component life cycle

    ngOnInit() {
    }


    ngOnDestroy() {
    }

    // endregion


    public onEditWaypointClicked(wp: Waypoint2) {
        this.session.selectedWaypoint = wp;
        this.session.editWaypointActive = true;
    }


    public onRemoveWaypointClicked(flightroute: Flightroute2, wp: Waypoint2) {
        flightroute.waypointList.remove(wp);
    }


    public onRemoveAlternateClicked(flightroute: Flightroute2) {
        flightroute.waypointList.alternate = undefined;
    }


    public onReverseWaypointsClicked(flightroute: Flightroute2) {
        flightroute.waypointList.reverse();
    }
}
