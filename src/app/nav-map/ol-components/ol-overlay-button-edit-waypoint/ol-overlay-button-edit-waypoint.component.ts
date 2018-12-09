import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../../flightroute/model/waypoint';


@Component({
    selector: 'app-ol-overlay-button-edit-waypoint',
    templateUrl: './ol-overlay-button-edit-waypoint.component.html',
    styleUrls: ['./ol-overlay-button-edit-waypoint.component.css']
})
export class OlOverlayButtonEditWaypointComponent implements OnInit {
    @Input() waypoint: Waypoint;


    ngOnInit() {
    }


    public onEditWaypointClick() {
    }
}
