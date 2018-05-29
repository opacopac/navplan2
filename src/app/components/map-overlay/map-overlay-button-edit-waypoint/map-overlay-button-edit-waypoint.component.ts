import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';
import { Sessioncontext } from "../../../model/sessioncontext";
import { SessionService } from "../../../services/utils/session.service";
import { FlightrouteService } from "../../../services/flightroute/flightroute.service";


@Component({
    selector: 'app-map-overlay-button-edit-waypoint',
    templateUrl: './map-overlay-button-edit-waypoint.component.html',
    styleUrls: ['./map-overlay-button-edit-waypoint.component.css']
})
export class MapOverlayButtonEditWaypointComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public session: Sessioncontext;


    constructor(
        private sessionService: SessionService,
        private flightrouteService: FlightrouteService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    public onEditWaypointClicked() {
        this.flightrouteService.editWaypoint(this.session.selectedWaypoint);
    }
}
