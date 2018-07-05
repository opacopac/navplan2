import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../model/waypoint';
import {Flightroute} from '../../model/flightroute';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';


@Component({
    selector: 'app-waypoint-list',
    templateUrl: './waypoint-list.component.html',
    styleUrls: ['./waypoint-list.component.css']
})
export class WaypointListComponent implements OnInit {
    @Input() flightroute: Flightroute;
    @Output() onEditWaypointClicked = new EventEmitter<Waypoint>();
    @Output() onRemoveWaypointClicked = new EventEmitter<Waypoint>();
    @Output() onReverseWaypointsClicked = new EventEmitter<null>();
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }
}
