import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';


@Component({
    selector: 'app-map-popup-button-edit-userpoint',
    templateUrl: './map-popup-button-edit-userpoint.component.html',
    styleUrls: ['./map-popup-button-edit-userpoint.component.scss']
})
export class MapPopupButtonEditUserpointComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public editUserpointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();


    constructor() {
    }


    ngOnInit() {
    }
}
