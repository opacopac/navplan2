import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-confirm-delete-dialog2',
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    templateUrl: './confirm-delete-dialog-component.component.html',
    styleUrls: ['./confirm-delete-dialog-component.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            title: string,
            text: string,
        }
    ) {
    }


    ngOnInit() {
    }


    protected getTitle(): string {
        return this.data.title || 'Confirm Deletion';
    }


    protected getText(): string {
        return this.data.text || 'Are you sure you want to delete this item?';
    }


    protected onDeleteClicked() {
        this.dialogRef.close({confirmDeletion: true});
    }


    protected onCancelClicked() {
        this.dialogRef.close({confirmDeletion: false});
    }
}
