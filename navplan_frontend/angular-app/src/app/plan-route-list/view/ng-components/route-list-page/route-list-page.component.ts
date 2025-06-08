import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getConsumptionUnit, getSpeedUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {FlightrouteListActions} from '../../../state/ngrx/flightroute-list.actions';
import {Flightroute} from '../../../../flightroute/domain/model/flightroute';
import {FlightrouteCrudActions} from '../../../../flightroute/state/ngrx/flightroute-crud.actions';
import {getFlightroute, getFlightrouteTableState} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {TableState} from '../../../../common/state/model/table-state';
import {getFlightrouteList} from '../../../state/ngrx/flightroute-list.selectors';
import {RouteListTableComponent} from '../route-list-table/route-list-table.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-route-list-page',
    imports: [
        CommonModule,
        RouteListTableComponent
    ],
    templateUrl: './route-list-page.component.html',
    styleUrls: ['./route-list-page.component.scss']
})
export class RouteListPageComponent implements OnInit {
    protected readonly flightrouteList$ = this.appStore.pipe(select(getFlightrouteList));
    protected readonly currentFlightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly speedUnit$ = this.appStore.pipe(select(getSpeedUnit));
    protected readonly consumptionUnit$ = this.appStore.pipe(select(getConsumptionUnit));
    protected readonly tableState$ = this.appStore.pipe(select(getFlightrouteTableState));

    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
        this.appStore.dispatch(FlightrouteListActions.readList());
    }


    protected onRouteCreated(route: Flightroute) {
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


    protected onTableStateChanged(tableState: TableState) {
        this.appStore.dispatch(FlightrouteListActions.updateTableState({tableState: tableState}));
    }
}
