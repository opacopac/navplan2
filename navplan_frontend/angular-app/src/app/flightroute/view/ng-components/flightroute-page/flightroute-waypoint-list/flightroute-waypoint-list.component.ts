import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../domain/model/waypoint';
import {Flightroute} from '../../../../domain/model/flightroute';
import {WaypointType} from '../../../../domain/model/waypoint-type';
import {TimeUnit} from '../../../../../geo-physics/domain/model/quantities/time-unit';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';


interface WaypointListDataSourceRow {
    wp: Waypoint;
    isAlternate: boolean;
    isOriginAirport: boolean;
    isDestinationAirport: boolean;
}


@Component({
    selector: 'app-flightroute-waypoint-list',
    templateUrl: './flightroute-waypoint-list.component.html',
    styleUrls: ['./flightroute-waypoint-list.component.scss']
})
export class FlightrouteWaypointListComponent implements OnInit, OnDestroy {
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
    public console = console;
    public wpDataSource: WaypointListDataSourceRow[] = [];

    private _flightroute: Flightroute;


    constructor() {
    }


    ngOnInit() {
    }


    ngOnDestroy(): void {
    }


    protected getAltText(wp: Waypoint): string {
        if (!wp || !wp.wpAlt || !wp.wpAlt.alt) {
            return '';
        } else {
            return wp.wpAlt.alt.getHeightAmsl().ft.toString();
        }
    }


    protected getAltStyle(wp: Waypoint): string {
        let deco = '';
        if (wp.wpAlt.isminalt) {
            deco += 'underline';
        }
        if (wp.wpAlt.ismaxalt) {
            deco += ' overline';
        }
        return deco;
    }


    protected getTotalDist(lengthUnit: LengthUnit = LengthUnit.NM): number {
        return Math.ceil(this.flightroute.tripDist.getValue(lengthUnit));
    }


    protected getTotalEet(timeUnit: TimeUnit = TimeUnit.M): number {
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
