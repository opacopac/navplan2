import {first} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../buttons/button-base.directive';
import {Sessioncontext} from '../../../model/sessioncontext';
import {SessionService} from '../../../services/session/session.service';


@Component({
    selector: 'app-map-overlay-button-remove-from-route',
    templateUrl: './map-overlay-button-remove-from-route.component.html',
    styleUrls: ['./map-overlay-button-remove-from-route.component.css']
})
export class MapOverlayButtonRemoveFromRouteComponent implements OnInit, OnDestroy {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public session: Sessioncontext;


    constructor(
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    public onRemoveSelectedWaypointClicked() {
        this.session.flightroute$
            .withLatestFrom(this.session.selectedWaypoint$)
            .pipe(first())
            .subscribe(([flightroute, selectedWaypoint]) => {
                flightroute.waypointList.remove(selectedWaypoint);
            });
    }
}
