import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {getFlightroute, getFlightrouteList} from '../../flightroute.selectors';
import {getCurrentUser} from '../../../user/user.selectors';
import {FlightrouteListEntry} from '../../model/flightroute-list-entry';
import {Flightroute} from '../../model/flightroute';
import {User} from '../../../user/model/user';
import {
    CreateFlightrouteAction,
    DeleteFlightrouteAction,
    DuplicateFlightrouteAction,
    ExportFlightrouteExcel,
    ExportFlightroutePdf,
    ReadFlightrouteAction,
    ReadFlightrouteListAction,
    UpdateAircraftConsumption,
    UpdateAircraftSpeed,
    UpdateExtraTime,
    UpdateFlightrouteAction,
    UpdateFlightrouteComments,
    UpdateFlightrouteTitle
} from '../../flightroute.actions';
import {Waypoint} from '../../model/waypoint';
import {DeleteWaypointAction, EditWaypointAction, ReverseWaypointsAction} from '../../waypoints.actions';


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
        this.currentUser$ = this.appStore.select(getCurrentUser);
        this.flightrouteList$ = this.appStore.select(getFlightrouteList);
        this.flightroute$ = this.appStore.select(getFlightroute);
    }


    ngOnInit() {
        this.appStore.dispatch(
            new ReadFlightrouteListAction()
        );
    }


    public onLoadFlightrouteClicked(flightRouteId: string) {
        this.appStore.dispatch(
            new ReadFlightrouteAction(Number(flightRouteId))
        );
    }


    public onSaveFlightrouteClicked(flightRouteId: string) {
        const flightRouteIdValue = Number(flightRouteId);
        if (flightRouteIdValue > 0) {
            this.appStore.dispatch(
                new UpdateFlightrouteAction()
            );
        } else {
            this.appStore.dispatch(
                new CreateFlightrouteAction()
            );
        }
    }


    public onSaveFlightrouteCopyClicked(flightRouteId: number) {
        this.appStore.dispatch(
            new DuplicateFlightrouteAction(flightRouteId)
        );
    }


    public onDeleteFlightrouteClicked(flightRouteId: string) {
        this.appStore.dispatch(
            new DeleteFlightrouteAction(Number(flightRouteId))
        );
    }


    public onUpdateRouteName(name: string) {
        this.appStore.dispatch(
            new UpdateFlightrouteTitle(name)
        );
    }


    public onUpdateRouteComments(comments: string) {
        this.appStore.dispatch(
            new UpdateFlightrouteComments(comments)
        );
    }


    public onUpdateAircraftSpeed(speed: string) {
        this.appStore.dispatch(
            new UpdateAircraftSpeed(Number(speed))
        );
    }


    public onUpdateAircraftConsumption(consumption: string) {
        this.appStore.dispatch(
            new UpdateAircraftConsumption(Number(consumption))
        );
    }


    public onUpdateExtraTime(extraTime: string) {
        this.appStore.dispatch(
            new UpdateExtraTime(Number(extraTime))
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
            new ExportFlightroutePdf(flightRouteId)
        );
    }


    public onExportFlightrouteExcelClicked(flightRouteId: number) {
        this.appStore.dispatch(
            new ExportFlightrouteExcel(flightRouteId)
        );
    }
}
