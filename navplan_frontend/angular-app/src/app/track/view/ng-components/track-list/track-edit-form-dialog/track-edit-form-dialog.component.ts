import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Track} from '../../../../domain/model/track';


@Component({
    selector: 'app-track-edit-form-dialog',
    templateUrl: './track-edit-form-dialog.component.html',
    styleUrls: ['./track-edit-form-dialog.component.scss']
})
export class TrackEditFormDialogComponent implements OnInit, OnChanges {
    protected editForm: FormGroup;


    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<TrackEditFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            track: Track;
        }
    ) {
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnChanges() {
        this.initForm();
    }


    protected isFormValid(): boolean {
        return this.editForm && this.editForm.valid;
    }


    protected onSaveClicked() {
        if (this.isFormValid()) {
            const newTrack = new Track(
                this.data.track.id,
                this.editForm.controls['name'].value,
                this.data.track.positionList,
                this.data.track.saveTime
            );

            this.dialogRef.close({track: newTrack});
        }
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }


    private initForm() {
        this.editForm = this.formBuilder.group({
            'name': [this.data.track.name, [Validators.required]]
        });
    }
}
