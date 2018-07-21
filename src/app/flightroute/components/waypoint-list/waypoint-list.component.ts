import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../model/waypoint';
import {Flightroute} from '../../model/flightroute';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {WaypointType} from '../../model/waypoint-type';


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
    public visibleColumns = ['freq', 'callsign', 'checkpoint', 'alt', 'mt', 'dist', 'eet', 'remarks', 'editIcon', 'deleteIcon'];


    constructor() {
    }


    ngOnInit() {
    }


    public isFirstLastAirport(wp: Waypoint, isFirst: boolean, isLast: boolean): boolean {
        return ((isFirst || isLast) && wp.type === WaypointType.airport);
    }


    public getAltStyle(wp: Waypoint): string {
        let deco = '';
        if (wp.alt.isminalt) {
            deco += 'underline';
        }
        if (wp.alt.ismaxalt) {
            deco += ' overline';
        }
        return deco;
    }
}
