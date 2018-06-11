import {Component, OnDestroy, OnInit} from '@angular/core';
import {Waypoint, Waypointtype} from '../../model/waypoint';
import {ButtonColor, ButtonSize} from '../buttons/button-base.directive';
import {FlightrouteService} from '../../services/flightroute/flightroute.service';
import {Flightroute} from '../../model/flightroute';
import {Subscription} from 'rxjs/Subscription';
import {SessionService} from '../../services/session/session.service';
import {Sessioncontext} from '../../model/sessioncontext';
import {Waypoint2} from '../../model/flightroute-model/waypoint2';


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
    public session: Sessioncontext;


    constructor(
        private sessionService: SessionService,
        private flightrouteService: FlightrouteService) {

        this.session = this.sessionService.getSessionContext();
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


    onEditWaypointClicked(wp: Waypoint2) {
        this.session.selectedWaypoint = wp;
        this.session.editWaypointActive = true;
    }


    /*onRemoveWaypointClicked(wp: Waypoint2) {
        this.session.flightroute$
            .subscribe((flightroute) => {
                flightroute.waypointList.remove(wp);
            });
    }*/


    /*onRemoveAlternateClicked() {
        this.flightrouteService.removeAlternateFromRoute();
    }*/


    onReverseWaypointsClicked() {
        this.flightrouteService.reverseWaypoints();
    }
}
