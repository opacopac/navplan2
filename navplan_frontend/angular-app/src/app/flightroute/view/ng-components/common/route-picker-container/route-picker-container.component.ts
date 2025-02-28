import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {getFlightroute, getFlightrouteList} from '../../../../state/ngrx/flightroute.selectors';
import {FlightrouteListActions} from '../../../../state/ngrx/flightroute-list.actions';
import {FlightrouteCrudActions} from '../../../../state/ngrx/flightroute-crud.actions';
import {
    FlightrouteListDialogComponent
} from '../../plan-route/flightroute-list-dialog/flightroute-list-dialog.component';


@Component({
    selector: 'app-route-picker-container',
    templateUrl: './route-picker-container.component.html',
    styleUrls: ['./route-picker-container.component.scss']
})
export class RoutePickerContainerComponent implements OnInit {
    @Input() public labelText: string;
    @Input() public showRouteName: boolean;

    protected readonly currentFlightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly flightrouteList$ = this.appStore.pipe(select(getFlightrouteList));

    constructor(
        private appStore: Store<any>,
        private dialog: MatDialog
    ) {
    }


    ngOnInit() {
    }


    protected onPickFlightrouteClicked() {
        this.appStore.dispatch(FlightrouteListActions.readList());

        const dialogRef = this.dialog.open(FlightrouteListDialogComponent, {
            // height: '800px',
            // width: '600px',
            data: {
                flightrouteList$: this.flightrouteList$,
                currentFlightroute$: this.currentFlightroute$
            }
        });

        dialogRef.afterClosed().subscribe((flightrouteId) => {
            if (flightrouteId) {
                this.appStore.dispatch(FlightrouteCrudActions.read({flightrouteId: flightrouteId}));
            }
        });
    }
}
