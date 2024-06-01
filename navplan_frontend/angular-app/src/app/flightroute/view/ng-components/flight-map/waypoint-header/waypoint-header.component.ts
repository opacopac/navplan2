import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../../../domain/model/waypoint';


@Component({
    selector: 'app-waypoint-header',
    templateUrl: './waypoint-header.component.html',
    styleUrls: ['./waypoint-header.component.scss']
})
export class WaypointHeaderComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    ngOnInit() {
    }
}
