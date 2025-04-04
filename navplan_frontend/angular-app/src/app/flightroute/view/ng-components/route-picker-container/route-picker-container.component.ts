import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {getFlightroute} from '../../../state/ngrx/flightroute.selectors';
import {FlightrouteListActions} from '../../../../plan-route-list/state/ngrx/flightroute-list.actions';
import {FlightrouteCrudActions} from '../../../state/ngrx/flightroute-crud.actions';
import {RoutePickerListDialogComponent} from '../route-picker-list-dialog/route-picker-list-dialog.component';
import {getFlightrouteList} from '../../../../plan-route-list/state/ngrx/flightroute-list.selectors';


@Component({
    selector: 'app-route-picker-container',
    templateUrl: './route-picker-container.component.html',
    styleUrls: ['./route-picker-container.component.scss']
})
export class RoutePickerContainerComponent implements OnInit {
    @Input() public labelText: string;
    @Input() public showIcon: boolean;
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

        const dialogRef = this.dialog.open(RoutePickerListDialogComponent, {
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
