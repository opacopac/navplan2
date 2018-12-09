import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../flightroute/model/waypoint';


@Component({
    selector: 'app-ol-overlay-button-edit-waypoint',
    templateUrl: './ol-overlay-button-edit-waypoint.component.html',
    styleUrls: ['./ol-overlay-button-edit-waypoint.component.css']
})
export class OlOverlayButtonEditWaypointComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public editWaypointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();


    ngOnInit() {
    }
}
