import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../domain/model/waypoint';


@Component({
    selector: 'app-map-popup-waypoint-button-set-alternate',
    templateUrl: './map-popup-waypoint-button-set-alternate.component.html',
    styleUrls: ['./map-popup-waypoint-button-set-alternate.component.scss']
})
export class MapPopupWaypointButtonSetAlternateComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public setAlternateClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();


    ngOnInit() {
    }
}
