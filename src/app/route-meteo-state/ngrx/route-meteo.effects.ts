import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {RouteMeteoActions} from './route-meteo.actions';
import {getRouteMeteoState} from './route-meteo.selectors';
import {RouteMeteoState} from '../state-model/route-meteo-state';
import {Length} from '../../geo-physics/domain-model/quantities/length';
import {LengthUnit} from '../../geo-physics/domain-model/quantities/length-unit';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {getFlightroute} from '../../flightroute-state/ngrx/flightroute.selectors';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {LineString} from '../../geo-physics/domain-model/geometry/line-string';
import {GeodesyHelper} from '../../geo-physics/domain-service/geometry/geodesy-helper';
import {IMetarTafService} from '../../metar-taf/domain-service/i-metar-taf.service';


@Injectable()
export class RouteMeteoEffects {
    private readonly maxMeteoRadius = new Length(30, LengthUnit.NM);
    private readonly routeMeteoState$: Observable<RouteMeteoState> = this.appStore.select(getRouteMeteoState);
    public readonly flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));
    public readonly meteoBoundingBox$: Observable<Extent2d> = this.flightroute$.pipe(
        filter(route => route.waypoints.length > 0),
        map(route => new LineString(route.waypoints.map(wp => wp.position))),
        map(line => GeodesyHelper.enlargeExtent(line.getBoundingBox(), this.maxMeteoRadius))
    );


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly metarTafService: IMetarTafService,
    ) {
    }


    updateRouteMetarTafAction$ = createEffect(() => this.actions$.pipe(
        ofType(RouteMeteoActions.update),
        withLatestFrom(
            this.meteoBoundingBox$,
            this.routeMeteoState$,
        ),
        filter(([action, meteoBox, meteoState]) => meteoBox && !meteoState.extent?.equals(meteoBox)),
        switchMap(([action, meteoBox, meteoState]) => this.metarTafService.load(meteoBox).pipe(
            map(metarTafs => RouteMeteoActions.updateSuccess(
                {
                    extent: meteoBox,
                    metarTafList: metarTafs
                }
            ))
        ))
    ));
}
