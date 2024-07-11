import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';


@Component({
    selector: 'app-map-popup-waypoint-header',
    templateUrl: './map-popup-waypoint-header.component.html',
    styleUrls: ['./map-popup-waypoint-header.component.scss']
})
export class MapPopupWaypointHeaderComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    ngOnInit() {
    }
}
