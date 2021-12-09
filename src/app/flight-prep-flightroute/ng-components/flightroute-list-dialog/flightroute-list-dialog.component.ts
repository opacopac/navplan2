import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FlightrouteListEntry} from '../../../flightroute/domain-model/flightroute-list-entry';
import {MatDialogRef} from '@angular/material/dialog';
import {FlightrouteListActions} from '../../ngrx/flightroute-list.actions';
import {FlightRouteCrudActions} from '../../ngrx/flight-route-crud.actions';
import {getFlightrouteList} from '../../ngrx/flightroute-list.selectors';


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
        this.appStore.dispatch(FlightrouteListActions.readList());
    }


    ngOnDestroy() {
    }


    public onLoadRouteClick(id: number) {
        this.appStore.dispatch(FlightRouteCrudActions.read({ flightrouteId: id }));
        this.dialogRef.close();
    }


    public onDuplicateRouteClick(id: number) {
        this.appStore.dispatch(FlightRouteCrudActions.saveDuplicate());
    }


    public onDeleteRouteClick(id: number) {
        this.appStore.dispatch(FlightRouteCrudActions.delete({ flightrouteId: id }));
    }


    public onCancelClick() {
        this.dialogRef.close();
    }
}
