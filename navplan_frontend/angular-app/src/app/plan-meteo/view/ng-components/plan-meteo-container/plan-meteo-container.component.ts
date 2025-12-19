import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouteMeteoActions} from '../../../state/ngrx/route-meteo.actions';
import {getRouteMeteoState} from '../../../state/ngrx/route-meteo.selectors';
import {map} from 'rxjs/operators';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {getRouteDistanceUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {PlanMeteoTableComponent} from '../plan-meteo-table/plan-meteo-table.component';
import {CommonModule} from '@angular/common';
import {
    RoutePickerContainerComponent
} from '../../../../plan-route-list/view/ng-components/route-picker-container/route-picker-container.component';
import {PlanDistanceFromRouteComponent} from '../../../../plan/view/ng-components/plan-distance-from-route/plan-distance-from-route.component';


@Component({
    selector: 'app-plan-meteo-container',
    imports: [
        CommonModule,
        PlanMeteoTableComponent,
        RoutePickerContainerComponent,
        PlanDistanceFromRouteComponent
    ],
    templateUrl: './plan-meteo-container.component.html',
    styleUrls: ['./plan-meteo-container.component.scss']
})
export class PlanMeteoContainerComponent implements OnInit {
    protected readonly routeMeteoState$ = this.appStore.select(getRouteMeteoState);
    protected readonly routeMetarTafs$ = this.routeMeteoState$.pipe(map(rms => rms.routeMetarTafs.routeMetarTafs));
    protected readonly maxRadius$ = this.routeMeteoState$.pipe(map(rms => rms.maxMeteoRadius));
    protected readonly distanceUnit$ = this.appStore.select(getRouteDistanceUnit);


    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
        this.appStore.dispatch(RouteMeteoActions.update());
    }


    protected onMaxRadiusChanged(radius: Length): void {
        this.appStore.dispatch(RouteMeteoActions.maxRadiusChanged({maxRadius: radius}));
    }
}

