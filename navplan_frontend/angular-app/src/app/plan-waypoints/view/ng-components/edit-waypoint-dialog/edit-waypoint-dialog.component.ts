import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {Observable} from 'rxjs';
import {EditWaypointFormComponent} from '../edit-waypoint-form/edit-waypoint-form.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-edit-waypoint-dialog',
    imports: [
        CommonModule,
        MatDialogModule,
        EditWaypointFormComponent
    ],
    templateUrl: './edit-waypoint-dialog.component.html',
    styleUrls: ['./edit-waypoint-dialog.component.scss']
})
export class EditWaypointDialogComponent implements OnInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<EditWaypointDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { editWaypoint: Waypoint; altitudeUnit$: Observable<LengthUnit> }
    ) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    protected onSaveClick([oldWp, newWp]: [Waypoint, Waypoint]) {
        this.dialogRef.close([oldWp, newWp]);
    }


    protected onCancelClick() {
        this.dialogRef.close();
    }
}
