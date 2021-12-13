import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouteMeteoActions} from '../../../route-meteo-state/ngrx/route-meteo.actions';
import {getRouteMeteoState} from '../../../route-meteo-state/ngrx/route-meteo.selectors';
import {map} from 'rxjs/operators';
import {Length} from '../../../geo-physics/domain-model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain-model/quantities/length-unit';
import {getFlightroute} from '../../../flightroute-state/ngrx/flightroute.selectors';


@Component({
    selector: 'app-route-meteo-container',
    templateUrl: './route-meteo-container.component.html',
    styleUrls: ['./route-meteo-container.component.css']
})
export class RouteMeteoContainerComponent implements OnInit {
    public readonly routeMeteoState$ = this.appStore.select(getRouteMeteoState);
    public readonly startMetarTafs$ = this.routeMeteoState$.pipe(map(rms => rms.routeMetarTafs.startMetarTafs));
    public readonly endMetarTafs$ = this.routeMeteoState$.pipe(map(rms => rms.routeMetarTafs.endMetarTafs));
    public readonly alternateMetarTafs$ = this.routeMeteoState$.pipe(map(rms => rms.routeMetarTafs.altMetarTafs));
    public readonly enRouteMetarTafs$ = this.routeMeteoState$.pipe(map(rms => rms.routeMetarTafs.enRouteMetarTafs));
    public readonly maxRadiusValue$ = this.routeMeteoState$.pipe(map(rms => rms.maxMeteoRadius.value));
    public readonly maxRadiusUnit$ = this.routeMeteoState$.pipe(map(rms => rms.maxMeteoRadius.getUnitString()));
    public readonly flightRoute$ = this.appStore.select(getFlightroute);
    public readonly startWp$ = this.flightRoute$.pipe(map(route => route.waypoints.length > 0 ? route.waypoints[0].checkpoint : ''));
    public readonly endWp$ = this.flightRoute$.pipe(map(route => route.waypoints.length > 1 ? route.waypoints[route.waypoints.length - 1].checkpoint : ''));
    public readonly altWp$ = this.flightRoute$.pipe(map(route => route.alternate ? route.alternate.checkpoint : ''));
    public readonly Number = Number;
    public readonly String = String;

    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
        this.appStore.dispatch(RouteMeteoActions.update());
    }


    public getColumnKeys(): string[] {
        return ['site', 'dist', 'metartaf'];
    }


    public onMaxRadiusChanged(maxRadValue: number): void {
        const newMaxRadius = new Length(maxRadValue, LengthUnit.NM);
        this.appStore.dispatch(RouteMeteoActions.maxRadiusChanged({ maxRadius: newMaxRadius }));
    }
}

