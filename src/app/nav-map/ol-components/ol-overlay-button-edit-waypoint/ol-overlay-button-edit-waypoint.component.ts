import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';
import {Waypoint} from '../../../flightroute/model/waypoint';
import {Observable} from 'rxjs/internal/Observable';


@Component({
    selector: 'app-ol-overlay-button-edit-waypoint',
    templateUrl: './ol-overlay-button-edit-waypoint.component.html',
    styleUrls: ['./ol-overlay-button-edit-waypoint.component.css']
})
export class OlOverlayButtonEditWaypointComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public selectedWaypoint$: Observable<Waypoint>; // TODO
    public flightrouteWaypoints$: Observable<Waypoint[]>; // TODO
    public selectedWaypointIsNew$: Observable<boolean>; // TODO


    ngOnInit() {
    }


    public onEditWaypointClick() {
        // this.session.editWaypointActive = true;
    }
}
