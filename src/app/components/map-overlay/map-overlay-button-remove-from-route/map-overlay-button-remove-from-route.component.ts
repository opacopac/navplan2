import * as Rx from "rxjs/Rx";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';
import { Sessioncontext } from "../../../model/sessioncontext";
import { SessionService } from "../../../services/utils/session.service";
import { FlightrouteService } from "../../../services/flightroute/flightroute.service";
import { Flightroute } from "../../../model/flightroute";


@Component({
    selector: 'app-map-overlay-button-remove-from-route',
    templateUrl: './map-overlay-button-remove-from-route.component.html',
    styleUrls: ['./map-overlay-button-remove-from-route.component.css']
})
export class MapOverlayButtonRemoveFromRouteComponent implements OnInit, OnDestroy {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
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
            currentFlightroute => { this.currentFlightroute = currentFlightroute; }
        );
    }


    ngOnDestroy() {
        this.currentFlightrouteSubscription.unsubscribe();
    }


    public onRemoveSelectedWaypointClicked() {
        this.flightrouteService.removeWaypointFromRoute(this.session.selectedWaypoint);
        this.session.selectedWaypoint.isNew = true;
    }
}
