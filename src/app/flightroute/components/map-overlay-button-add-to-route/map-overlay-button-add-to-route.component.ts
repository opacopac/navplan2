import {Component, OnInit} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {Observable} from 'rxjs/internal/Observable';
import {Waypoint} from '../../model/waypoint';


@Component({
    selector: 'app-map-overlay-button-add-to-route',
    templateUrl: './map-overlay-button-add-to-route.component.html',
    styleUrls: ['./map-overlay-button-add-to-route.component.css']
})
export class MapOverlayButtonAddToRouteComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public addAfterIndex: number;
    public selectedWaypoint$: Observable<Waypoint>; // TODO
    public flightrouteWaypoints$: Observable<Waypoint[]>; // TODO
    public selectedWaypointIsNew$: Observable<boolean>; // TODO


    ngOnInit() {
    }


    public onAddSelectedWaypointClicked() {
        /* this.session.flightroute$
            .withLatestFrom(this.session.selectedWaypoint$)
            .pipe(first())
            .subscribe(([flightroute, selectedWaypoint]) => {
                const index = flightroute.waypointList.indexOf(selectedWaypoint);
                flightroute.waypointList.insert(selectedWaypoint, index);
            }); */
    }
}
