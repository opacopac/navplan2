import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {MatCardModule} from '@angular/material/card';


@Component({
    selector: 'app-map-popup-waypoint-header',
    standalone: true,
    imports: [
        MatCardModule
    ],
    templateUrl: './map-popup-waypoint-header.component.html',
    styleUrls: ['./map-popup-waypoint-header.component.scss']
})
export class MapPopupWaypointHeaderComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    ngOnInit() {
    }
}
