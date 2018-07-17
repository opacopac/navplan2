import { Component, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';
import {Observable} from 'rxjs/internal/Observable';


@Component({
    selector: 'app-map-overlay-button-set-alternate',
    templateUrl: './map-overlay-button-set-alternate.component.html',
    styleUrls: ['./map-overlay-button-set-alternate.component.css']
})
export class MapOverlayButtonSetAlternateComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public selectedWaypointIsAlternate$: Observable<boolean>; // TODO


    ngOnInit() {
    }


    public onSetAlternateClicked() {
        /*this.session.flightroute$
            .withLatestFrom(this.session.selectedWaypoint$)
            .pipe(first())
            .subscribe(([flightroute, selectedWaypoint]) => {
                flightroute.waypointList.alternate = selectedWaypoint;
            });*/
    }
}
