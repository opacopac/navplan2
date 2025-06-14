import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {Track} from '../../../../track/domain/model/track';
import {ConfirmDeleteDialogComponent} from '../../../../common/view/ng-components/confirm-delete-dialog/confirm-delete-dialog.component';


@Component({
    selector: 'app-track-delete-confirm-dialog',
    imports: [
        ConfirmDeleteDialogComponent
    ],
    templateUrl: './track-delete-confirm-dialog.component.html',
    styleUrls: ['./track-delete-confirm-dialog.component.scss']
})
export class TrackDeleteConfirmDialogComponent implements OnInit {
    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<TrackDeleteConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            track: Track;
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
