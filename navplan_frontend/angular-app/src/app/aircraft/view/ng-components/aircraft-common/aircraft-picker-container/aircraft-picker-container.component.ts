import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getAircraftList, getCurrentAircraft} from '../../../../state/ngrx/aircraft.selectors';
import {MatDialog} from '@angular/material/dialog';
import {AircraftPickerDialogComponent} from '../aircraft-picker-dialog/aircraft-picker-dialog.component';
import {AircraftListActions} from '../../../../state/ngrx/aircraft-list.actions';


@Component({
    selector: 'app-aircraft-picker-container',
    templateUrl: './aircraft-picker-container.component.html',
    styleUrls: ['./aircraft-picker-container.component.scss']
})
export class AircraftPickerContainerComponent implements OnInit {
    @Input() public labelText: string;
    @Input() public showRegistration: boolean;

    protected readonly currentAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly aircraftList$ = this.appStore.pipe(select(getAircraftList));

    constructor(
        private appStore: Store<any>,
        private dialog: MatDialog
    ) {
    }


    ngOnInit() {
    }


    protected onSearchAircraftClicked() {
        this.appStore.dispatch(AircraftListActions.readList());

        const dialogRef = this.dialog.open(AircraftPickerDialogComponent, {
            // height: '800px',
            // width: '600px',
            data: {
                aircraftList$: this.aircraftList$,
                currentAircraft$: this.currentAircraft$
            }
        });

        dialogRef.afterClosed().subscribe((aircraftId) => {
            if (aircraftId) {
                this.appStore.dispatch(AircraftListActions.selectAircraft({aircraftId: aircraftId}));
            }
        });
    }
}
