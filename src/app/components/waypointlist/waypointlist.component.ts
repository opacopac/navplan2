import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../../services/utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { EditwaypointComponent } from '../editwaypoint/editwaypoint.component';
import { Waypoint, Waypointtype } from '../../model/waypoint';
import { ButtonColor, ButtonSize } from '../buttons/button-base.directive';


@Component({
    selector: 'app-waypointlist',
    templateUrl: './waypointlist.component.html',
    styleUrls: ['./waypointlist.component.css']
})
export class WaypointlistComponent implements OnInit {
    public session: Sessioncontext;
    public Waypointtype = Waypointtype;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    @ViewChild(EditwaypointComponent) editWaypointComponent: EditwaypointComponent;


    constructor(private sessionService: SessionService) {
        this.session = sessionService.getSessionContext();
    }

    ngOnInit() {
    }


    onEditWaypointClicked(wp: Waypoint) {
        this.editWaypointComponent.editWaypoint(wp);
    }


    onWaypointChanged() {
    }


    onRemoveWaypointClicked(wp: Waypoint) {
        const idx = this.session.flightroute.waypoints.indexOf(wp);
        this.session.flightroute.waypoints.splice(idx, 1);

        this.session.flightroute.recalcWaypointsAndFuel();
    }


    onRemoveAlternateClicked() {
        this.session.flightroute.alternate = undefined;
        this.session.flightroute.recalcWaypointsAndFuel();
    }


    onReverseWaypointsClicked() {
        if (this.session.flightroute.waypoints.length === 0) {
            return;
        }

        const wpTmpList: Waypoint[] = [];

        for (let i = this.session.flightroute.waypoints.length - 1; i >= 0; i--) {
            wpTmpList.push(this.session.flightroute.waypoints[i]);
        }

        this.session.flightroute.waypoints = [];

        for (let i = 0; i < wpTmpList.length; i++) {
            this.session.flightroute.waypoints.push(wpTmpList[i]);
        }

        this.session.flightroute.recalcWaypointsAndFuel();
    }
}
