import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain-model/waypoint';


@Component({
    selector: 'app-waypoint-button-edit-waypoint',
    templateUrl: './waypoint-button-edit-waypoint.component.html',
    styleUrls: ['./waypoint-button-edit-waypoint.component.css']
})
export class WaypointButtonEditWaypointComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public editWaypointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();


    ngOnInit() {
    }
}
