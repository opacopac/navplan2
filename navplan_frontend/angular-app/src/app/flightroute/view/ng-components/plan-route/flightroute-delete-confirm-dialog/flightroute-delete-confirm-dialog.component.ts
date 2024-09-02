import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {FlightrouteListEntry} from '../../../../domain/model/flightroute-list-entry';


@Component({
    selector: 'app-flightroute-delete-confirm-dialog',
    templateUrl: './flightroute-delete-confirm-dialog.component.html',
    styleUrls: ['./flightroute-delete-confirm-dialog.component.scss']
})
export class FlightrouteDeleteConfirmDialogComponent implements OnInit {
    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<FlightrouteDeleteConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            flightroute: FlightrouteListEntry;
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
