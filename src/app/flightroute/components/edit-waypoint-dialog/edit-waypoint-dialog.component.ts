import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Waypoint} from '../../model/waypoint';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {WaypointAltitude} from '../../model/waypoint-altitude';


@Component({
    selector: 'app-edit-waypoint-form',
    templateUrl: './edit-waypoint-dialog.component.html',
    styleUrls: ['./edit-waypoint-dialog.component.css']
})
export class EditWaypointDialogComponent implements OnInit {
    public editWpForm: FormGroup;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<EditWaypointDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private editWaypoint: Waypoint) {

        this.initForm(editWaypoint);
    }


    ngOnInit() {
    }


    public onDeleteSuppInfoClicked() {
        this.editWpForm.patchValue({'supp_info': ''});
    }


    public onSaveClicked() {
        const wp = new Waypoint(
            this.editWaypoint.type,
            this.editWpForm.get('freq').value,
            this.editWpForm.get('callsign').value,
            this.editWpForm.get('checkpoint').value,
            this.editWpForm.get('remark').value,
            this.editWpForm.get('supp_info').value,
            this.editWaypoint.position,
            new WaypointAltitude(
                this.editWpForm.get('alt').value,
                this.editWpForm.get('isminalt').value,
                this.editWpForm.get('ismaxalt').value,
                this.editWpForm.get('isaltatlegstart').value
            )
        );

        this.dialogRef.close(wp);
    }


    public onCancelClicked() {
        this.dialogRef.close(undefined);
    }


    private initForm(editWaypoint: Waypoint) {
        this.editWpForm = this.formBuilder.group({
            'checkpoint': [
                editWaypoint ? editWaypoint.checkpoint : '',
                [Validators.required, Validators.maxLength(30)]],
            'freq': [
                editWaypoint ? editWaypoint.freq : '',
                Validators.maxLength(7)],
            'callsign': [
                editWaypoint ? editWaypoint.callsign : '',
                Validators.maxLength(10)],
            'alt': [
                (editWaypoint && editWaypoint.alt.alt_ft) ? editWaypoint.alt.alt_ft : '',
                [Validators.maxLength(5), Validators.min(0), Validators.max(99999)]],
            'isminalt': [
                editWaypoint ? editWaypoint.alt.isminalt : false],
            'ismaxalt': [
                editWaypoint ? editWaypoint.alt.ismaxalt : false],
            'isaltatlegstart': [
                editWaypoint ? editWaypoint.alt.isaltatlegstart : false ],
            'remark': [
                editWaypoint ? editWaypoint.remark : '',
                Validators.maxLength(50)],
            'supp_info': [
                editWaypoint ? editWaypoint.supp_info : '',
                Validators.maxLength(255)]
        });
    }
}
