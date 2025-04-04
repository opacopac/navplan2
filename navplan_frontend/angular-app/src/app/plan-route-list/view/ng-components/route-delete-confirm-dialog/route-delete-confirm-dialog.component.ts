import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {FlightrouteListEntry} from '../../../../flightroute/domain/model/flightroute-list-entry';


@Component({
    selector: 'app-route-delete-confirm-dialog',
    templateUrl: './route-delete-confirm-dialog.component.html',
    styleUrls: ['./route-delete-confirm-dialog.component.scss']
})
export class RouteDeleteConfirmDialogComponent implements OnInit {
    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<RouteDeleteConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            flightroute: FlightrouteListEntry;
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
