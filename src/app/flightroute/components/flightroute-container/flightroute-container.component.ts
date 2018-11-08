import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getFlightroute, getFlightrouteList} from '../../flightroute.selectors';
import {getCurrentUser} from '../../../user/user.selectors';
import {FlightrouteListEntry} from '../../model/flightroute-list-entry';
import {Flightroute} from '../../model/flightroute';
import {User} from '../../../user/model/user';
import {
    FlightrouteCreateAction,
    FlightrouteDeleteAction,
    FlightrouteDuplicateAction,
    ExportFlightrouteExcelAction,
    ExportFlightroutePdfAction,
    FlightrouteReadAction,
    FlightrouteReadListAction,
    UpdateAircraftConsumptionAction,
    UpdateAircraftSpeedAction,
    UpdateExtraTimeAction,
    FlightrouteUpdateAction,
    UpdateFlightrouteCommentsAction,
    UpdateFlightrouteTitleAction
} from '../../flightroute.actions';
import {Waypoint} from '../../model/waypoint';
import {DeleteWaypointAction, EditWaypointAction, ReverseWaypointsAction} from '../../flightroute.actions';


@Component({
    selector: 'app-flightroute-container',
    templateUrl: './flightroute-container.component.html',
    styleUrls: ['./flightroute-container.component.css']
})
export class FlightrouteContainerComponent implements OnInit {
    public currentUser$: Observable<User>;
    public flightrouteList$: Observable<FlightrouteListEntry[]>;
    public flightroute$: Observable<Flightroute>;


    constructor(private appStore: Store<any>) {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
        this.flightrouteList$ = this.appStore.pipe(select(getFlightrouteList));
        this.flightroute$ = this.appStore.pipe(select(getFlightroute));
    }


    ngOnInit() {
        this.appStore.dispatch(
            new FlightrouteReadListAction()
        );
    }


    public onLoadFlightrouteClicked(flightRouteId: string) {
        this.appStore.dispatch(
            new FlightrouteReadAction(Number(flightRouteId))
        );
    }


    public onSaveFlightrouteClicked(flightRouteId: string) {
        const flightRouteIdValue = Number(flightRouteId);
        if (flightRouteIdValue > 0) {
            this.appStore.dispatch(
                new FlightrouteUpdateAction()
            );
        } else {
            this.appStore.dispatch(
                new FlightrouteCreateAction()
            );
        }
    }


    public onSaveFlightrouteCopyClicked(flightRouteId: number) {
        this.appStore.dispatch(
            new FlightrouteDuplicateAction(flightRouteId)
        );
    }


    public onDeleteFlightrouteClicked(flightRouteId: string) {
        this.appStore.dispatch(
            new FlightrouteDeleteAction(Number(flightRouteId))
        );
    }


    public onUpdateRouteName(name: string) {
        this.appStore.dispatch(
            new UpdateFlightrouteTitleAction(name)
        );
    }


    public onUpdateRouteComments(comments: string) {
        this.appStore.dispatch(
            new UpdateFlightrouteCommentsAction(comments)
        );
    }


    public onUpdateAircraftSpeed(speed: string) {
        this.appStore.dispatch(
            new UpdateAircraftSpeedAction(Number(speed))
        );
    }


    public onUpdateAircraftConsumption(consumption: string) {
        this.appStore.dispatch(
            new UpdateAircraftConsumptionAction(Number(consumption))
        );
    }


    public onUpdateExtraTime(extraTime: string) {
        this.appStore.dispatch(
            new UpdateExtraTimeAction(Number(extraTime))
        );
    }


    public onEditWaypointClicked(waypoint: Waypoint) {
        this.appStore.dispatch(
            new EditWaypointAction(waypoint)
        );
    }


    public onRemoveWaypointClicked(waypoint: Waypoint) {
        this.appStore.dispatch(
            new DeleteWaypointAction(waypoint)
        );
    }


    public onReverseWaypointsClicked() {
        this.appStore.dispatch(
            new ReverseWaypointsAction()
        );
    }


    public onExportFlightroutePdfClicked(flightRouteId: number) {
        this.appStore.dispatch(
            new ExportFlightroutePdfAction(flightRouteId)
        );
    }


    public onExportFlightrouteExcelClicked(flightRouteId: number) {
        this.appStore.dispatch(
            new ExportFlightrouteExcelAction(flightRouteId)
        );
    }
}
