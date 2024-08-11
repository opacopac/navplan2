import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Aircraft} from '../../../domain/model/aircraft';
import {AircraftPickerListComponent} from '../aircraft-picker-list/aircraft-picker-list.component';
import {AircraftListEntry} from '../../../domain/model/aircraft-list-entry';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-aircraft-picker-dialog',
    templateUrl: './aircraft-picker-dialog.component.html',
    styleUrls: ['./aircraft-picker-dialog.component.scss']
})
export class AircraftPickerDialog implements OnInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<AircraftPickerListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            aircraftList$: Observable<AircraftListEntry[]>,
            currentAircraft$: Observable<Aircraft>
        }
    ) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    protected onSelectClick(aircraftId: number) {
        this.dialogRef.close(aircraftId);
    }


    protected onCancelClick() {
        this.dialogRef.close();
    }
}
