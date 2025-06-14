import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {AircraftListEntry} from '../../../../domain/model/aircraft-list-entry';
import {
    ConfirmDeleteDialogComponent
} from '../../../../../common/view/ng-components/confirm-delete-dialog/confirm-delete-dialog.component';


@Component({
    selector: 'app-aircraft-delete-confirm-dialog',
    imports: [
        ConfirmDeleteDialogComponent
    ],
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


    protected onDeleteClicked() {
        this.dialogRef.close({confirmDeletion: true});
    }


    protected onCancelClicked() {
        this.dialogRef.close({confirmDeletion: false});
    }
}
