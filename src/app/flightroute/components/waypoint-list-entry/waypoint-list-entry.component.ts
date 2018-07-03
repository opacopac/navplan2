import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../model/waypoint';
import {ButtonColor, ButtonSize} from '../../../components/buttons/button-base.directive';
import {Waypointtype} from '../../../model/waypoint';


@Component({
    selector: '[app-waypoint-list-entry]',
    templateUrl: './waypoint-list-entry.component.html',
    styleUrls: ['./waypoint-list-entry.component.css']
})
export class WaypointListEntryComponent implements OnInit {
    @Input() wp: Waypoint;
    @Input() isFirst: boolean;
    @Input() isLast: boolean;
    @Input() isAlternate: boolean;
    @Output() onEditWaypointClicked = new EventEmitter<Waypoint>();
    @Output() onRemoveWaypointClicked = new EventEmitter<Waypoint>();
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public isFirstLastAirport(): boolean {
        return ((this.isFirst || this.isLast) && this.wp.type === Waypointtype.airport);
    }


    public getRowClass(): string {
        if ((this.isFirst || this.isLast) && this.wp.type === Waypointtype.airport) {
            return "{ 'table-active': true }";
        } else if (this.isAlternate) {
            return "{ 'warning': true }";
        } else {
            return undefined;
        }
    }


    public getAltStyle(): string {
        let deco = '';
        if (this.wp.alt.isminalt) {
            deco += 'underline';
        }
        if (this.wp.alt.ismaxalt) {
            deco += ' overline';
        }

        return "{ 'text-decoration': '" + deco + "' }";
    }
}
