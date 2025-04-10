import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MatDialogRef} from '@angular/material/dialog';
import {FlightrouteListActions} from '../../../state/ngrx/flightroute-list.actions';
import {FlightrouteCrudActions} from '../../../../flightroute/state/ngrx/flightroute-crud.actions';
import {getFlightrouteList} from '../../../state/ngrx/flightroute-list.selectors';
import {RoutePickerListComponent} from '../route-picker-list/route-picker-list.component';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-route-picker-list-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        RoutePickerListComponent,
    ],
    templateUrl: './route-picker-list-dialog.component.html',
    styleUrls: ['./route-picker-list-dialog.component.scss']
})
export class RoutePickerListDialogComponent implements OnInit, OnDestroy {
    public readonly flightrouteList$ = this.appStore.pipe(select(getFlightrouteList));


    constructor(
        private dialogRef: MatDialogRef<RoutePickerListDialogComponent>,
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


    public onCancelClick() {
        this.dialogRef.close();
    }
}
