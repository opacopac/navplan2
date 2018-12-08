import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {OlOverlayBase} from '../../base-map/components/ol-overlay-base';
import {Waypoint} from '../../flightroute/model/waypoint';
import {InsertWaypointAction, DeleteWaypointAction} from '../../flightroute/flightroute.actions';
import {getFlightroute} from '../../flightroute/flightroute.selectors';
import {Flightroute} from '../../flightroute/model/flightroute';
import {BaseMapOverlayCloseAction} from '../../base-map/base-map.actions';
import {ChangeDetectorRef} from '@angular/core';


export abstract class OlOverlayWaypointBase extends OlOverlayBase {
    public flightroute$: Observable<Flightroute>;
    public isNewWaypoint$: Observable<boolean>;


    public constructor(
        cdRef: ChangeDetectorRef,
        private appStore: Store<any>) {
        super(cdRef);
        this.flightroute$ = this.appStore.pipe(select(getFlightroute));
    }


    public onInsertWaypointAt(wpIdx: [Waypoint, number]) {
        this.appStore.dispatch(new BaseMapOverlayCloseAction());
        this.appStore.dispatch(new InsertWaypointAction(wpIdx[0], wpIdx[1]));
    }


    public onDeleteWaypoint(waypoint: Waypoint) {
        this.appStore.dispatch(new BaseMapOverlayCloseAction());
        this.appStore.dispatch(new DeleteWaypointAction(waypoint));
    }
}
