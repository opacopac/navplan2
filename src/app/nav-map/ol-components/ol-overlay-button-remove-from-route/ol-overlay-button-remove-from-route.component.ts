import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../flightroute/domain/waypoint';


@Component({
    selector: 'app-ol-overlay-button-remove-from-route',
    templateUrl: './ol-overlay-button-remove-from-route.component.html',
    styleUrls: ['./ol-overlay-button-remove-from-route.component.css']
})
export class OlOverlayButtonRemoveFromRouteComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public removeWaypointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();



    ngOnInit() {
    }
}
