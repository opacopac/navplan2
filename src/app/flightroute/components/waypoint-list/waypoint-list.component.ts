import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../model/waypoint';
import {Flightroute} from '../../model/flightroute';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {WaypointType} from '../../model/waypoint-type';
import {LengthUnit, TimeUnit} from '../../../shared/model/units';
import {log} from 'util';


interface WaypointListDataSourceRow {
    wp: Waypoint;
    isAlternate: boolean;
    isOriginAirport: boolean;
    isDestinationAirport: boolean;
}


@Component({
    selector: 'app-waypoint-list',
    templateUrl: './waypoint-list.component.html',
    styleUrls: ['./waypoint-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaypointListComponent implements OnInit {
    @Input() flightroute: Flightroute;
    @Output() onEditWaypointClicked = new EventEmitter<Waypoint>();
    @Output() onRemoveWaypointClicked = new EventEmitter<Waypoint>();
    @Output() onReverseWaypointsClicked = new EventEmitter<null>();
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public visibleColumns = ['freq', 'callsign', 'checkpoint', 'alt', 'mt', 'dist', 'eet', 'remarks', 'icons'];


    constructor() {
    }


    ngOnInit() {
    }


    public getWaypointList(): WaypointListDataSourceRow[] {
        const wpList: WaypointListDataSourceRow[] = [];

        this.flightroute.waypoints.forEach((wp, index) => wpList.push({
            wp: wp,
            isAlternate: false,
            isOriginAirport: index === 0 && wp.type === WaypointType.airport,
            isDestinationAirport: index === this.flightroute.waypoints.length - 1 && wp.type === WaypointType.airport
        }));

        if (this.flightroute.alternate) {
            wpList.push({
                wp: this.flightroute.alternate,
                isAlternate: true,
                isOriginAirport: false,
                isDestinationAirport: false
            });
        }

        return wpList;
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


    public getTotalDist(lengthUnit: LengthUnit = LengthUnit.NM): number {
        return Math.ceil(this.flightroute.tripDist.getValue(lengthUnit));
    }


    public getTotalEet(timeUnit: TimeUnit = TimeUnit.M): number {
        return Math.ceil(this.flightroute.fuel.tripTime.getValue(timeUnit));
    }
}
