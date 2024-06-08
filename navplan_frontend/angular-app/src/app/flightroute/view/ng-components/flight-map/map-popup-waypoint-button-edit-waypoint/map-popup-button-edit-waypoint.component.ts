import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../domain/model/waypoint';


@Component({
    selector: 'app-map-popup-waypoint-button-edit-waypoint',
    templateUrl: './map-popup-button-edit-waypoint.component.html',
    styleUrls: ['./map-popup-button-edit-waypoint.component.scss']
})
export class MapPopupButtonEditWaypointComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public editWaypointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();


    ngOnInit() {
    }
}
