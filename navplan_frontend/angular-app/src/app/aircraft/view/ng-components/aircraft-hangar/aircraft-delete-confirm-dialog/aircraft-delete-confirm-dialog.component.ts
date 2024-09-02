import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {AircraftListEntry} from '../../../../domain/model/aircraft-list-entry';


@Component({
    selector: 'app-aircraft-delete-confirm-dialog',
    templateUrl: './aircraft-delete-confirm-dialog.component.html',
    styleUrls: ['./aircraft-delete-confirm-dialog.component.scss']
})
export class AircraftDeleteConfirmDialogComponent implements OnInit {
    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AircraftDeleteConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            aircraft: AircraftListEntry;
        }
    ) {
    }


    ngOnInit() {
    }


    protected onOkClicked() {
        this.dialogRef.close({confirmDeletion: true});
    }


    protected onCancelClicked() {
        this.dialogRef.close({confirmDeletion: false});
    }
}
