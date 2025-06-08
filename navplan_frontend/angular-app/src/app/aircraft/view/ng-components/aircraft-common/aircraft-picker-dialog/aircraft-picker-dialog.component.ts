import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Aircraft} from '../../../../domain/model/aircraft';
import {AircraftListEntry} from '../../../../domain/model/aircraft-list-entry';
import {Observable} from 'rxjs';
import {AircraftPickerListComponent} from '../aircraft-picker-list/aircraft-picker-list.component';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-aircraft-picker-dialog',
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        AircraftPickerListComponent,
    ],
    templateUrl: './aircraft-picker-dialog.component.html',
    styleUrls: ['./aircraft-picker-dialog.component.scss']
})
export class AircraftPickerDialogComponent implements OnInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<AircraftPickerDialogComponent>,
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
