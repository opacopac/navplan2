import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouteMeteoActions} from '../../../route-meteo-state/ngrx/route-meteo.actions';
import {getRouteMetarTafList} from '../../../route-meteo-state/ngrx/route-meteo.selectors';


@Component({
    selector: 'app-route-meteo-container',
    templateUrl: './route-meteo-container.component.html',
    styleUrls: ['./route-meteo-container.component.css']
})
export class RouteMeteoContainerComponent implements OnInit {
    public readonly routeMeteoTafs$ = this.appStore.select(getRouteMetarTafList);


    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
        this.appStore.dispatch(RouteMeteoActions.update());
    }
}
