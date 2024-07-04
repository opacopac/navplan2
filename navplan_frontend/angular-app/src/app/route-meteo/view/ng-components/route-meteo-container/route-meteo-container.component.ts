import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouteMeteoActions} from '../../../state/ngrx/route-meteo.actions';
import {getRouteMeteoState} from '../../../state/ngrx/route-meteo.selectors';
import {map} from 'rxjs/operators';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-route-meteo-container',
    templateUrl: './route-meteo-container.component.html',
    styleUrls: ['./route-meteo-container.component.scss']
})
export class RouteMeteoContainerComponent implements OnInit {
    public readonly routeMeteoState$ = this.appStore.select(getRouteMeteoState);
    public readonly routeMetarTafs$ = this.routeMeteoState$.pipe(map(rms => rms.routeMetarTafs.routeMetarTafs));
    public readonly maxRadiusValue$ = this.routeMeteoState$.pipe(map(rms => rms.maxMeteoRadius.value));
    public readonly maxRadiusUnit$ = this.routeMeteoState$.pipe(map(rms => rms.maxMeteoRadius.getUnitString()));
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
        this.appStore.dispatch(RouteMeteoActions.maxRadiusChanged({maxRadius: newMaxRadius}));
    }
}

