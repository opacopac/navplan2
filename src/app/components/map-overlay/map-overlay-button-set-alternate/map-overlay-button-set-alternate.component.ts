import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';
import { SessionService } from '../../../core/services/session/session.service';
import { Sessioncontext } from '../../../model/session/sessioncontext';
import {first} from 'rxjs/operators/first';


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
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    public onSetAlternateClicked() {
        this.session.flightroute$
            .withLatestFrom(this.session.selectedWaypoint$)
            .pipe(first())
            .subscribe(([flightroute, selectedWaypoint]) => {
                flightroute.waypointList.alternate = selectedWaypoint;
            });
    }
}
