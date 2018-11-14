import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FlightrouteListEntry} from '../../model/flightroute-list-entry';
import {getFlightrouteList} from '../../flightroute.selectors';
import {
    FlightrouteDeleteAction,
    FlightrouteDuplicateAction, FlightrouteReadAction,
    FlightrouteReadListAction
} from '../../flightroute.actions';
import {MatDialogRef} from '@angular/material';


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
        this.appStore.dispatch(new FlightrouteReadListAction());
    }


    ngOnDestroy() {
    }


    public onLoadRouteClick(id: number) {
        this.appStore.dispatch(new FlightrouteReadAction(id));
        this.dialogRef.close();
    }


    public onDuplicateRouteClick(id: number) {
        this.appStore.dispatch(new FlightrouteDuplicateAction(id));
    }


    public onDeleteRouteClick(id: number) {
        this.appStore.dispatch(new FlightrouteDeleteAction(id));
    }


    public onCancelClick() {
        this.dialogRef.close();
    }
}
