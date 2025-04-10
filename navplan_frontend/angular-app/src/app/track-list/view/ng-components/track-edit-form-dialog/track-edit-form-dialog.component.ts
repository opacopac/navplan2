import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Track} from '../../../../track/domain/model/track';
import {FormDialogComponent} from '../../../../common/view/ng-components/form-dialog/form-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-track-edit-form-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormDialogComponent,
    ],
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
