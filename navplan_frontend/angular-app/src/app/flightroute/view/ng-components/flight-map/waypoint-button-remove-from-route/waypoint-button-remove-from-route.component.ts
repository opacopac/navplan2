import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../domain/model/waypoint';


@Component({
    selector: 'app-waypoint-button-remove-from-route',
    templateUrl: './waypoint-button-remove-from-route.component.html',
    styleUrls: ['./waypoint-button-remove-from-route.component.scss']
})
export class WaypointButtonRemoveFromRouteComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public removeWaypointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();



    ngOnInit() {
    }
}
