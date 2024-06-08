import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../../../domain/model/waypoint';


@Component({
    selector: 'app-map-popup-waypoint-info-tab',
    templateUrl: './map-popup-waypoint-info-tab.component.html',
    styleUrls: ['./map-popup-waypoint-info-tab.component.scss']
})
export class MapPopupWaypointInfoTabComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    ngOnInit() {
    }
}
