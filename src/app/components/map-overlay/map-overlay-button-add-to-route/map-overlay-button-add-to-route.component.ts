import * as Rx from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';
import { SessionService } from "../../../services/utils/session.service";
import { Sessioncontext } from "../../../model/sessioncontext";
import { FlightrouteService } from "../../../services/flightroute/flightroute.service";
import {Flightroute} from "../../../model/flightroute";


@Component({
    selector: 'app-map-overlay-button-add-to-route',
    templateUrl: './map-overlay-button-add-to-route.component.html',
    styleUrls: ['./map-overlay-button-add-to-route.component.css']
})
export class MapOverlayButtonAddToRouteComponent implements OnInit, OnDestroy {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public addAfterIndex: number;
    public session: Sessioncontext;
    public currentFlightroute: Flightroute;
    private currentFlightrouteSubscription: Rx.Subscription;


    constructor(
        private sessionService: SessionService,
        private flightrouteService: FlightrouteService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
        this.currentFlightrouteSubscription = this.flightrouteService.currentRoute$.subscribe(
            currentFlightroute => {
                this.currentFlightroute = currentFlightroute;
                this.addAfterIndex = this.currentFlightroute.waypoints.length + 1;
            }
        );
    }


    ngOnDestroy() {
        this.currentFlightrouteSubscription.unsubscribe();
    }


    public onAddSelectedWaypointClicked() {
        this.flightrouteService.addWaypointToRoute(this.session.selectedWaypoint, this.addAfterIndex);
        this.session.selectedWaypoint.isNew = false;
    }
}
