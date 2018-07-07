import {Component, OnInit} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';


@Component({
    selector: 'app-map-overlay-button-remove-from-route',
    templateUrl: './map-overlay-button-remove-from-route.component.html',
    styleUrls: ['./map-overlay-button-remove-from-route.component.css']
})
export class MapOverlayButtonRemoveFromRouteComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    ngOnInit() {
    }


    public onRemoveSelectedWaypointClicked() {
        /*this.session.flightroute$
            .withLatestFrom(this.session.selectedWaypoint$)
            .pipe(first())
            .subscribe(([flightroute, selectedWaypoint]) => {
                flightroute.waypointList.remove(selectedWaypoint);
            });*/
    }
}
