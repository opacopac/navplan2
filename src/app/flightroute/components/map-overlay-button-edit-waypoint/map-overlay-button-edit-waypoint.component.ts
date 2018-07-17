import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';
import {Waypoint} from '../../model/waypoint';
import {Observable} from 'rxjs/internal/Observable';


@Component({
    selector: 'app-map-overlay-button-edit-waypoint',
    templateUrl: './map-overlay-button-edit-waypoint.component.html',
    styleUrls: ['./map-overlay-button-edit-waypoint.component.css']
})
export class MapOverlayButtonEditWaypointComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public selectedWaypoint$: Observable<Waypoint>; // TODO
    public flightrouteWaypoints$: Observable<Waypoint[]>; // TODO
    public selectedWaypointIsNew$: Observable<boolean>; // TODO


    ngOnInit() {
    }


    public onEditWaypointClicked() {
        // this.session.editWaypointActive = true;
    }
}
