import $ from 'jquery';
declare var $: $; // wtf? --> https://github.com/dougludlow/ng2-bs3-modal/issues/147
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Waypoint} from '../../model/waypoint';
import {getEditWaypoint} from '../../flightroute.selectors';
import {Subscription} from 'rxjs/Subscription';
import {CancelEditWaypointAction, SaveEditWaypointAction} from '../../waypoints.actions';


@Component({
    selector: 'app-edit-waypoint-container',
    templateUrl: './edit-waypoint-container.component.html',
    styleUrls: ['./edit-waypoint-container.component.css']
})
export class EditWaypointContainerComponent implements OnInit, OnDestroy {
    public editWaypoint$: Observable<Waypoint>;
    private editWaypointActiveSubscription: Subscription;


    constructor(private appStore: Store<any>) {
        this.editWaypoint$ = this.appStore.select(getEditWaypoint);
    }


    ngOnInit() {
        this.editWaypointActiveSubscription = this.editWaypoint$
            .subscribe((editWaypoint) => {
                if (editWaypoint) {
                    this.showForm();
                } else {
                    this.hideForm();
                }
            });
    }


    ngOnDestroy() {
        this.editWaypointActiveSubscription.unsubscribe();
    }


    public onSaveClicked(waypoint: Waypoint) {
        this.appStore.dispatch(
            new SaveEditWaypointAction(waypoint)
        );
    }


    public onCancelClicked() {
        this.appStore.dispatch(
            new CancelEditWaypointAction()
        );
    }


    private showForm() {
        window.setTimeout(() => {
            $('#selectedWaypointDialog').modal('show');
        }, 10);
    }


    private hideForm() {
        window.setTimeout(() => {
            $('#selectedWaypointDialog').modal('hide');
        }, 10);
    }
}
