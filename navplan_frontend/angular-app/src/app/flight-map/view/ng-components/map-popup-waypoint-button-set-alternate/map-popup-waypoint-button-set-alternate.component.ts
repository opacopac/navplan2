import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {ButtonColor} from '../../../../common/view/model/button-color';


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

    protected readonly ButtonColor = ButtonColor;
}
