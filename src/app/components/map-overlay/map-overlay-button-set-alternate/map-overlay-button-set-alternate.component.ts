import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../buttons/button-base.directive';
import { FlightrouteService } from "../../../services/flightroute/flightroute.service";
import { SessionService } from "../../../services/utils/session.service";
import { Sessioncontext } from "../../../model/sessioncontext";


@Component({
    selector: 'app-map-overlay-button-set-alternate',
    templateUrl: './map-overlay-button-set-alternate.component.html',
    styleUrls: ['./map-overlay-button-set-alternate.component.css']
})
export class MapOverlayButtonSetAlternateComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public session: Sessioncontext;


    constructor(
        private sessionService: SessionService,
        private flightrouteService: FlightrouteService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    public onSetAlternateClicked() {
        this.flightrouteService.setAlternate(this.session.selectedWaypoint);
    }
}
