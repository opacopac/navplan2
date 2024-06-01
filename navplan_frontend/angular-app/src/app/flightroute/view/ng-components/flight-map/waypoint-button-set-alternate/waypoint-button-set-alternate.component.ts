import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../domain/model/waypoint';


@Component({
    selector: 'app-waypoint-button-set-alternate',
    templateUrl: './waypoint-button-set-alternate.component.html',
    styleUrls: ['./waypoint-button-set-alternate.component.scss']
})
export class WaypointButtonSetAlternateComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public setAlternateClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();


    ngOnInit() {
    }
}
