import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../domain-model/waypoint';


@Component({
    selector: 'app-ol-overlay-waypoint-header',
    templateUrl: './ol-overlay-waypoint-header.component.html',
    styleUrls: ['./ol-overlay-waypoint-header.component.css']
})
export class OlOverlayWaypointHeaderComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    ngOnInit() {
    }
}
