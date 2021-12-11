import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FlightrouteListEntry} from '../../../../flightroute/domain-model/flightroute-list-entry';
import {MatDialogRef} from '@angular/material/dialog';
import {FlightrouteListActions} from '../../../../flightroute-state/ngrx/flightroute-list.actions';
import {FlightrouteCrudActions} from '../../../../flightroute-state/ngrx/flightroute-crud.actions';
import {getFlightrouteList} from '../../../../flightroute-state/ngrx/flightroute.selectors';


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
        this.appStore.dispatch(FlightrouteCrudActions.read({ flightrouteId: id }));
        this.dialogRef.close();
    }


    public onDuplicateRouteClick(id: number) {
        this.appStore.dispatch(FlightrouteCrudActions.saveDuplicate());
    }


    public onDeleteRouteClick(id: number) {
        this.appStore.dispatch(FlightrouteCrudActions.delete({ flightrouteId: id }));
    }


    public onCancelClick() {
        this.dialogRef.close();
    }
}
