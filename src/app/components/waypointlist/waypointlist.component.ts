import { Component, OnDestroy, OnInit } from '@angular/core';
import { Waypoint, Waypointtype } from '../../model/waypoint';
import { ButtonColor, ButtonSize } from '../buttons/button-base.directive';
import { FlightrouteService } from "../../services/flightroute/flightroute.service";
import { Flightroute } from "../../model/flightroute";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'app-waypointlist',
    templateUrl: './waypointlist.component.html',
    styleUrls: ['./waypointlist.component.css']
})
export class WaypointlistComponent implements OnInit, OnDestroy {
    public Waypointtype = Waypointtype;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public currentFlightroute: Flightroute;
    private currentFlightrouteSubscription: Subscription;


    constructor(
        private flightrouteService: FlightrouteService) {
    }


    // region component life cycle

    ngOnInit() {
        this.currentFlightrouteSubscription = this.flightrouteService.currentRoute$.subscribe(
            currentFlightroute => { this.currentFlightroute = currentFlightroute; }
        );
    }


    ngOnDestroy() {
        this.currentFlightrouteSubscription.unsubscribe();
    }

    // endregion


    onEditWaypointClicked(wp: Waypoint) {
        this.flightrouteService.editWaypoint(wp);
    }


    onRemoveWaypointClicked(wp: Waypoint) {
        this.flightrouteService.removeWaypointFromRoute(wp);
    }


    onRemoveAlternateClicked() {
        this.flightrouteService.removeAlternateFromRoute();
    }


    onReverseWaypointsClicked() {
        this.flightrouteService.reverseWaypoints();
    }
}
