import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MatDialogRef} from '@angular/material/dialog';
import {FlightrouteListActions} from '../../../../state/ngrx/flightroute-list.actions';
import {FlightrouteCrudActions} from '../../../../state/ngrx/flightroute-crud.actions';
import {getFlightrouteList} from '../../../../state/ngrx/flightroute.selectors';


@Component({
    selector: 'app-flightroute-list-dialog',
    templateUrl: './flightroute-list-dialog.component.html',
    styleUrls: ['./flightroute-list-dialog.component.scss']
})
export class FlightrouteListDialogComponent implements OnInit, OnDestroy {
    public readonly flightrouteList$ = this.appStore.pipe(select(getFlightrouteList));


    constructor(
        private dialogRef: MatDialogRef<FlightrouteListDialogComponent>,
        private readonly appStore: Store<any>
    ) {
    }


    ngOnInit() {
        this.appStore.dispatch(FlightrouteListActions.readList());
    }


    ngOnDestroy() {
    }


    public onLoadRouteClick(id: number) {
        this.appStore.dispatch(FlightrouteCrudActions.read({flightrouteId: id}));
        this.dialogRef.close();
    }


    public onDeleteRouteClick(id: number) {
        this.appStore.dispatch(FlightrouteCrudActions.delete({flightrouteId: id}));
    }


    public onCancelClick() {
        this.dialogRef.close();
    }
}
