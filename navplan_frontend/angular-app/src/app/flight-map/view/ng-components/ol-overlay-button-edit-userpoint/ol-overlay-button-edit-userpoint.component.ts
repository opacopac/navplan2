import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';


@Component({
    selector: 'app-ol-overlay-button-edit-userpoint',
    templateUrl: './ol-overlay-button-edit-userpoint.component.html',
    styleUrls: ['./ol-overlay-button-edit-userpoint.component.scss']
})
export class OlOverlayButtonEditUserpointComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public editUserpointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();


    constructor() {
    }


    ngOnInit() {
    }
}
