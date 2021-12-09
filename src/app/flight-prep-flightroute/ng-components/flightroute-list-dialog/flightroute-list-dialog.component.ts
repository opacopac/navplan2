import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FlightrouteListEntry} from '../../../flightroute/domain-model/flightroute-list-entry';
import {getFlightrouteList} from '../../../flightroute/ngrx/flightroute.selectors';
import {MatDialogRef} from '@angular/material/dialog';
import {FlightRouteListActions} from '../../../flightroute/ngrx/flight-route-list.actions';
import {FlightRouteActions} from '../../../flightroute/ngrx/flight-route.actions';


@Component({
    selector: 'app-flightroute-list-dialog',
    templateUrl: './flightroute-list-dialog.component.html',
    styleUrls: ['./flightroute-list-dialog.component.css']
})
export class FlightrouteListDialogComponent implements OnInit, OnDestroy {
    public readonly flightrouteList$: Observable<FlightrouteListEntry[]>;


    constructor(
        private dialogRef: MatDialogRef<FlightrouteListDialogComponent>,
        private readonly appStore: Store<any>) {
        this.flightrouteList$ = this.appStore.pipe(select(getFlightrouteList));
    }


    ngOnInit() {
        this.appStore.dispatch(FlightRouteListActions.readList());
    }


    ngOnDestroy() {
    }


    public onLoadRouteClick(id: number) {
        this.appStore.dispatch(FlightRouteActions.read({ flightrouteId: id }));
        this.dialogRef.close();
    }


    public onDuplicateRouteClick(id: number) {
        this.appStore.dispatch(FlightRouteActions.saveDuplicate());
    }


    public onDeleteRouteClick(id: number) {
        this.appStore.dispatch(FlightRouteActions.delete({ flightrouteId: id }));
    }


    public onCancelClick() {
        this.dialogRef.close();
    }
}
