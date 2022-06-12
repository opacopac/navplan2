import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Waypoint} from '../../../../domain/model/waypoint';
import {EditWaypointFormComponent} from '../edit-waypoint-form/edit-waypoint-form.component';


@Component({
    selector: 'app-edit-waypoint-container',
    templateUrl: './edit-waypoint-dialog.component.html',
    styleUrls: ['./edit-waypoint-dialog.component.css']
})
export class EditWaypointDialogComponent implements OnInit, OnDestroy {


    constructor(
        private dialogRef: MatDialogRef<EditWaypointFormComponent>,
        @Inject(MAT_DIALOG_DATA) public editWaypoint: Waypoint
    ) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    public onSaveClick([oldWp, newWp]: [Waypoint, Waypoint]) {
        this.dialogRef.close([oldWp, newWp]);
    }


    public onCancelClick() {
        this.dialogRef.close();
    }
}
