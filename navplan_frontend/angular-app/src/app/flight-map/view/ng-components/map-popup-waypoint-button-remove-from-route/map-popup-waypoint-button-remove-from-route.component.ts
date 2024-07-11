import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {ButtonColor} from '../../../../common/view/model/button-color';


@Component({
    selector: 'app-map-popup-waypoint-button-remove-from-route',
    templateUrl: './map-popup-waypoint-button-remove-from-route.component.html',
    styleUrls: ['./map-popup-waypoint-button-remove-from-route.component.scss']
})
export class MapPopupWaypointButtonRemoveFromRouteComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public removeWaypointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();

    protected readonly ButtonColor = ButtonColor;


    ngOnInit() {
    }
}
