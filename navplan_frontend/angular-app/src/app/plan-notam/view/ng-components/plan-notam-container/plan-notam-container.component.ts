import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouteNotamActions} from '../../../state/ngrx/route-notam.actions';
import {getRouteNotamState} from '../../../state/ngrx/route-notam.selectors';
import {map} from 'rxjs/operators';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {getRouteDistanceUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {PlanNotamTableComponent} from '../plan-notam-table/plan-notam-table.component';
import {CommonModule} from '@angular/common';
import {
    RoutePickerContainerComponent
} from '../../../../plan-route-list/view/ng-components/route-picker-container/route-picker-container.component';
import {PlanDistanceFromRouteComponent} from '../../../../plan/view/ng-components/plan-distance-from-route/plan-distance-from-route.component';


@Component({
    selector: 'app-plan-notam-container',
    imports: [
        CommonModule,
        PlanNotamTableComponent,
        RoutePickerContainerComponent,
        PlanDistanceFromRouteComponent
    ],
    templateUrl: './plan-notam-container.component.html',
    styleUrls: ['./plan-notam-container.component.scss']
})
export class PlanNotamContainerComponent implements OnInit {
    protected readonly routeNotamState$ = this.appStore.select(getRouteNotamState);
    protected readonly notams$ = this.routeNotamState$.pipe(map(rns => rns.notams));
    protected readonly maxRadius$ = this.routeNotamState$.pipe(map(rns => rns.maxNotamRadius));
    protected readonly distanceUnit$ = this.appStore.select(getRouteDistanceUnit);


    constructor(private appStore: Store<any>) {
    }


    ngOnInit(): void {
        this.appStore.dispatch(RouteNotamActions.update());
    }


    protected onMaxRadiusChanged(radius: Length): void {
        this.appStore.dispatch(RouteNotamActions.maxRadiusChanged({maxRadius: radius}));
    }
}
