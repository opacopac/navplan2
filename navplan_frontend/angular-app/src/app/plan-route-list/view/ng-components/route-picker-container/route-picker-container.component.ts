import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {getFlightroute} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {FlightrouteListActions} from '../../../state/ngrx/flightroute-list.actions';
import {FlightrouteCrudActions} from '../../../../flightroute/state/ngrx/flightroute-crud.actions';
import {RoutePickerListDialogComponent} from '../route-picker-list-dialog/route-picker-list-dialog.component';
import {getFlightrouteList} from '../../../state/ngrx/flightroute-list.selectors';
import {RoutePickerComponent} from '../route-picker/route-picker.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-route-picker-container',
    imports: [
        CommonModule,
        RoutePickerComponent
    ],
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
