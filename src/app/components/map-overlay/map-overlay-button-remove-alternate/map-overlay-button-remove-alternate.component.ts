import * as Rx from "rxjs/Rx";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Flightroute } from "../../../model/flightroute";
import { ButtonColor, ButtonSize } from "../../buttons/button-base.directive";
import { SessionService } from "../../../services/utils/session.service";
import { Sessioncontext } from "../../../model/sessioncontext";
import { FlightrouteService } from "../../../services/flightroute/flightroute.service";


@Component({
  selector: 'app-map-overlay-button-remove-alternate',
  templateUrl: './map-overlay-button-remove-alternate.component.html',
  styleUrls: ['./map-overlay-button-remove-alternate.component.css']
})
export class MapOverlayButtonRemoveAlternateComponent implements OnInit, OnDestroy {
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


    public onRemoveAlternateClicked() {
        this.flightrouteService.removeAlternateFromRoute();
        this.session.selectedWaypoint.isNew = true;
    }
}
