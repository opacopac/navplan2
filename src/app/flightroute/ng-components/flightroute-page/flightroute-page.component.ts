import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FlightRouteExportActions} from '../../ngrx/flight-route-export.actions';


@Component({
    selector: 'app-flightroute-page',
    templateUrl: './flightroute-page.component.html',
    styleUrls: ['./flightroute-page.component.css'],
})
export class FlightroutePageComponent implements OnInit {


    constructor(private appStore: Store<any>) {
    }

    ngOnInit() {
    }


    public onExportFlightroutePdfClick(flightRouteId: number) {
        this.appStore.dispatch(FlightRouteExportActions.exportPdf({ flightrouteId: flightRouteId }));
    }


    public onExportFlightrouteExcelClick(flightRouteId: number) {
        this.appStore.dispatch(FlightRouteExportActions.exportExcel({ flightrouteId: flightRouteId }));
    }
}
