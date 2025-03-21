import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getConsumptionUnit, getSpeedUnit} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {FlightrouteListActions} from '../../../../state/ngrx/flightroute-list.actions';
import {Flightroute} from '../../../../domain/model/flightroute';
import {FlightrouteCrudActions} from '../../../../state/ngrx/flightroute-crud.actions';
import {getFlightroute, getFlightrouteList} from '../../../../state/ngrx/flightroute.selectors';


@Component({
    selector: 'app-route-list-page',
    templateUrl: './route-list-page.component.html',
    styleUrls: ['./route-list-page.component.scss'],
})
export class RouteListPageComponent implements OnInit {
    protected readonly flightrouteList$ = this.appStore.pipe(select(getFlightrouteList));
    protected readonly currentFlightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly speedUnit$ = this.appStore.pipe(select(getSpeedUnit));
    protected readonly consumptionUnit$ = this.appStore.pipe(select(getConsumptionUnit));

    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
        this.appStore.dispatch(FlightrouteListActions.readList());
    }


    protected onCreateRoute(route: Flightroute) {
        // this.appStore.dispatch(FlightrouteCrudActions.createNewAircraft({aircraft: route}));
    }


    protected onRouteSelected(routeId: number) {
        this.appStore.dispatch(FlightrouteCrudActions.read({flightrouteId: routeId}));
    }


    protected onRouteEdited(routeId: number) {
        // this.appStore.dispatch(FlightrouteCrudActions.editAircraft({aircraftId: routeId}));
    }


    protected onRouteDuplicated(routeId: number) {
        this.appStore.dispatch(FlightrouteCrudActions.saveDuplicate({flightrouteId: routeId}));
    }


    protected onRouteDeleted(routeId: number) {
        this.appStore.dispatch(FlightrouteCrudActions.delete({flightrouteId: routeId}));
    }
}
