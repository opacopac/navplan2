import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Waypoint} from '../../model/waypoint';
import {EditWaypointFormComponent} from '../edit-waypoint-form/edit-waypoint-form.component';


@Component({
    selector: 'app-edit-waypoint-container',
    templateUrl: './edit-waypoint-dialog.component.html',
    styleUrls: ['./edit-waypoint-dialog.component.css']
})
export class EditWaypointDialogComponent implements OnInit, OnDestroy {


    constructor(
        private dialogRef: MatDialogRef<EditWaypointFormComponent>,
        @Inject(MAT_DIALOG_DATA) public editWaypoint: Waypoint) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    public onSaveClick(wp: Waypoint) {
        this.dialogRef.close(wp);
    }


    public onCancelClick() {
        this.dialogRef.close();
    }
}
