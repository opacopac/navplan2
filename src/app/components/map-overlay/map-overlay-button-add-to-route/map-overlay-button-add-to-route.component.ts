import {first} from 'rxjs/operators/first';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../buttons/button-base.directive';
import {SessionService} from '../../../services/session/session.service';
import {Sessioncontext} from '../../../model/sessioncontext';


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


    constructor(
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    public onAddSelectedWaypointClicked() {
        this.session.flightroute$
            .withLatestFrom(this.session.selectedWaypoint$)
            .pipe(first())
            .subscribe(([flightroute, selectedWaypoint]) => {
                const index = flightroute.waypointList.indexOf(selectedWaypoint);
                flightroute.waypointList.insert(selectedWaypoint, index);
            });
    }
}
