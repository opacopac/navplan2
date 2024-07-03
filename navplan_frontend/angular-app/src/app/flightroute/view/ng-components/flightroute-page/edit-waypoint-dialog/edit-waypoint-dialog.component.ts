import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Waypoint} from '../../../../domain/model/waypoint';
import {EditWaypointFormComponent} from '../edit-waypoint-form/edit-waypoint-form.component';
import {AltitudeUnit} from '../../../../../geo-physics/domain/model/geometry/altitude-unit';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-edit-waypoint-container',
    templateUrl: './edit-waypoint-dialog.component.html',
    styleUrls: ['./edit-waypoint-dialog.component.scss']
})
export class EditWaypointDialogComponent implements OnInit, OnDestroy {
    protected readonly AltitudeUnit = AltitudeUnit;


    constructor(
        private dialogRef: MatDialogRef<EditWaypointFormComponent>,
        @Inject(MAT_DIALOG_DATA) public editWaypoint: Waypoint
    ) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    protected getAltitudeUnit(): LengthUnit {
        return LengthUnit.FT; // TODO
    }


    protected onSaveClick([oldWp, newWp]: [Waypoint, Waypoint]) {
        this.dialogRef.close([oldWp, newWp]);
    }


    protected onCancelClick() {
        this.dialogRef.close();
    }
}
