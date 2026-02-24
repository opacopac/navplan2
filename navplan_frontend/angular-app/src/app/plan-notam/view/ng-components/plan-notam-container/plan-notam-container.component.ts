import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RouteNotamActions} from '../../../state/ngrx/route-notam.actions';
import {getRouteNotamState} from '../../../state/ngrx/route-notam.selectors';
import {map} from 'rxjs/operators';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {getRouteDistanceUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {LocationNotamsListComponent} from '../location-notams-list/location-notams-list.component';
import {CommonModule} from '@angular/common';
import {
    RoutePickerContainerComponent
} from '../../../../plan-route-list/view/ng-components/route-picker-container/route-picker-container.component';
import {RouteDistanceInputComponent} from '../../../../geo-physics/view/ng-components/route-distance-input/route-distance-input.component';


@Component({
    selector: 'app-plan-notam-container',
    imports: [
        CommonModule,
        LocationNotamsListComponent,
        RoutePickerContainerComponent,
        RouteDistanceInputComponent
    ],
    templateUrl: './plan-notam-container.component.html',
    styleUrls: ['./plan-notam-container.component.scss']
})
export class PlanNotamContainerComponent implements OnInit {
    protected readonly routeNotamState$ = this.appStore.select(getRouteNotamState);
    protected readonly locationNotams$ = this.routeNotamState$.pipe(map(rns => rns.locationNotams));
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
