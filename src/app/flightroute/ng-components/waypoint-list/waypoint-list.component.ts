import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../domain-model/waypoint';
import {Flightroute} from '../../domain-model/flightroute';
import {ButtonColor, ButtonSize} from '../../../common/directives/button-base/button-base.directive';
import {WaypointType} from '../../domain-model/waypoint-type';
import {LengthUnit, TimeUnit} from '../../../common/geo-math/domain-model/quantities/units';


interface WaypointListDataSourceRow {
    wp: Waypoint;
    isAlternate: boolean;
    isOriginAirport: boolean;
    isDestinationAirport: boolean;
}


@Component({
    selector: 'app-waypoint-list',
    templateUrl: './waypoint-list.component.html',
    styleUrls: ['./waypoint-list.component.css']
})
export class WaypointListComponent implements OnInit {
    @Input() flightroute: Flightroute;
    @Output() onEditWaypointClick = new EventEmitter<Waypoint>();
    @Output() onRemoveWaypointClick = new EventEmitter<Waypoint>();
    @Output() onReverseWaypointsClick = new EventEmitter<null>();
    public visibleColumns = ['freq', 'callsign', 'checkpoint', 'alt', 'mt', 'dist', 'eet', 'remarks', 'icons'];
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public console = console;


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
