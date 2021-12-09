import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../flightroute/domain-model/waypoint';
import {Flightroute} from '../../../flightroute/domain-model/flightroute';
import {ButtonColor, ButtonSize} from '../../../common/directives/button-base/button-base.directive';
import {WaypointType} from '../../../flightroute/domain-model/waypoint-type';
import {TimeUnit} from '../../../common/geo-math/domain-model/quantities/time-unit';
import {LengthUnit} from '../../../common/geo-math/domain-model/quantities/length-unit';


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
export class WaypointListComponent implements OnInit, OnDestroy {
    @Input()
    set flightroute(flightroute: Flightroute) {
        this._flightroute = flightroute;
        this.wpDataSource = this.calcWaypointDataSource(flightroute);
    }
    get flightroute(): Flightroute {
        return this._flightroute;
    }
    @Output() onEditWaypointClick = new EventEmitter<Waypoint>();
    @Output() onRemoveWaypointClick = new EventEmitter<Waypoint>();
    @Output() onReverseWaypointsClick = new EventEmitter<null>();
    public visibleColumns = ['freq', 'callsign', 'checkpoint', 'alt', 'mt', 'dist', 'eet', 'remarks', 'icons'];
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public console = console;
    public wpDataSource: WaypointListDataSourceRow[] = [];
    private _flightroute: Flightroute;


    constructor() {
    }


    ngOnInit() {
    }


    ngOnDestroy(): void {
    }


    public getAltText(wp: Waypoint): string {
        if (!wp || !wp.wpAlt || !wp.wpAlt.alt) {
            return '';
        } else {
            return wp.wpAlt.alt.getHeightAmsl().ft.toString();
        }
    }


    public getAltStyle(wp: Waypoint): string {
        let deco = '';
        if (wp.wpAlt.isminalt) {
            deco += 'underline';
        }
        if (wp.wpAlt.ismaxalt) {
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


    private calcWaypointDataSource(flightroute: Flightroute): WaypointListDataSourceRow[] {
        const wpList: WaypointListDataSourceRow[] = [];

        flightroute.waypoints.forEach((wp, index) => wpList.push({
            wp: wp,
            isAlternate: false,
            isOriginAirport: index === 0 && wp.type === WaypointType.airport,
            isDestinationAirport: index === flightroute.waypoints.length - 1 && wp.type === WaypointType.airport
        }));

        if (flightroute.alternate) {
            wpList.push({
                wp: flightroute.alternate,
                isAlternate: true,
                isOriginAirport: false,
                isDestinationAirport: false
            });
        }

        return wpList;
    }
}
