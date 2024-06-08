import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../../../domain/model/waypoint';


@Component({
    selector: 'app-waypoint-info-tab',
    templateUrl: './waypoint-info-tab.component.html',
    styleUrls: ['./waypoint-info-tab.component.scss']
})
export class WaypointInfoTabComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    ngOnInit() {
    }
}
