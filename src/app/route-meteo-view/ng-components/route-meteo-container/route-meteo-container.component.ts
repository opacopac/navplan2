import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouteMeteoActions} from '../../../route-meteo-state/ngrx/route-meteo.actions';
import {getRouteMetarTafs} from '../../../route-meteo-state/ngrx/route-meteo.selectors';
import {MetarTaf} from '../../../metar-taf/domain-model/metar-taf';


@Component({
    selector: 'app-route-meteo-container',
    templateUrl: './route-meteo-container.component.html',
    styleUrls: ['./route-meteo-container.component.css']
})
export class RouteMeteoContainerComponent implements OnInit {
    public readonly routeMeteoTafs$ = this.appStore.select(getRouteMetarTafs);


    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
        this.appStore.dispatch(RouteMeteoActions.update());
    }


    public getColumnKeys(): string[] {
        return ['site', 'dist', 'metartaf'];
    }


    public getDistanceText(metarTaf: MetarTaf): string {
        return '0 Nm';
    }
}
