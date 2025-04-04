import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable, of, pipe} from 'rxjs';
import {getMetarTafState} from '../../../metar-taf/state/ngrx/metar-taf.selectors';
import {getAirportState} from '../../../aerodrome/state/ngrx/airport.selectors';
import {
    getReportingPointSectorState
} from '../../../aerodrome-reporting/state/ngrx/reporting-point-sector.selectors';
import {getNavaidState} from '../../../navaid/state/ngrx/navaid.selectors';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {DataItem} from '../../../common/model/data-item';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {map} from 'rxjs/operators';
import {getFlightroute} from '../../../flightroute/state/ngrx/flightroute.selectors';
import {MetarTaf} from '../../../metar-taf/domain/model/metar-taf';


@Injectable()
export class FlightMapStateService {
    private readonly flightRouteState$ = this.appStore.select(pipe(getFlightroute));
    private readonly airportState$ = this.appStore.pipe(select(getAirportState));
    private readonly reportingPointSectorState$ = this.appStore.pipe(select(getReportingPointSectorState));
    private readonly metarTafState$ = this.appStore.pipe(select(getMetarTafState));
    private readonly navaidState$ = this.appStore.pipe(select(getNavaidState));


    public constructor(private appStore: Store<any>) {
    }


    public findDataItemByPos$(position: Position2d): Observable<DataItem> {
        if (!position) {
            return of(undefined);
        }

        return combineLatest([
            of(position),
            this.airportState$,
            this.reportingPointSectorState$,
            this.navaidState$
        ]).pipe(
            map(([pos, airportState, rpState, navaidState]) => {
                const airports = airportState.airports.filter(airport => airport.position.equals(pos));
                if (airports.length > 0) {
                    return airports[0];
                }

                const repPoints = rpState.reportingPoints.filter(rp => rp.position.equals(pos));
                if (repPoints.length > 0) {
                    return repPoints[0];
                }

                const navaids = navaidState.navaids.filter(navaid => navaid.position.equals(pos));
                if (navaids.length > 0) {
                    return navaids[0];
                }

                return undefined;
            })
        );
    }


    public findWaypointsByPos$(position: Position2d): Observable<Waypoint[]> {
        if (!position) {
            return of([]);
        }

        return this.flightRouteState$.pipe(
            map(route => {
                return route.waypoints.filter(wp => wp.position.equals(position));
            })
        );
    }


    public findMetarTafByIcao$(icao: string): Observable<MetarTaf> {
        if (!icao) {
            return of(undefined);
        }

        return this.metarTafState$.pipe(
            map(state => {
                const metarTafs = state.metarTafs.filter(metarTaf => metarTaf.ad_icao === icao);
                return metarTafs.length > 0 ? metarTafs[0] : undefined;
            })
        );
    }
}
