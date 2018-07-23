import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Waypoint} from '../../model/waypoint';
import {getEditWaypoint} from '../../flightroute.selectors';
import {CancelEditWaypointAction, SaveEditWaypointAction} from '../../waypoints.actions';
import {EditWaypointDialogComponent} from '../edit-waypoint-dialog/edit-waypoint-dialog.component';


@Component({
    selector: 'app-edit-waypoint-container',
    templateUrl: './edit-waypoint-container.component.html',
    styleUrls: ['./edit-waypoint-container.component.css']
})
export class EditWaypointContainerComponent implements OnInit, OnDestroy {
    public editWaypoint$: Observable<Waypoint>;
    private editWaypointActiveSubscription: Subscription;


    constructor(
        private appStore: Store<any>,
        private dialog: MatDialog) {

        this.editWaypoint$ = this.appStore.select(getEditWaypoint);
    }


    ngOnInit() {
        this.editWaypointActiveSubscription = this.editWaypoint$
            .subscribe((editWaypoint) => {
                if (editWaypoint) {
                    this.showDialog(editWaypoint);
                }
            });
    }


    ngOnDestroy() {
        this.editWaypointActiveSubscription.unsubscribe();
    }


    private showDialog(editWaypoint: Waypoint) {
        const dialogRef = this.dialog.open(EditWaypointDialogComponent, {
            // height: '800px',
            // width: '600px',
            data: editWaypoint
        });

        dialogRef.afterClosed().subscribe((result: Waypoint) => {
            if (result) {
                this.appStore.dispatch(
                    new SaveEditWaypointAction(result)
                );
            } else {
                this.appStore.dispatch(
                    new CancelEditWaypointAction()
                );
            }
        });
    }
}
