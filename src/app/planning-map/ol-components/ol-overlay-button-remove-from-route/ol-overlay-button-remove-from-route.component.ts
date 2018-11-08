import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {Waypoint} from '../../../flightroute/model/waypoint';


@Component({
    selector: 'app-ol-overlay-button-remove-from-route',
    templateUrl: './ol-overlay-button-remove-from-route.component.html',
    styleUrls: ['./ol-overlay-button-remove-from-route.component.css']
})
export class OlOverlayButtonRemoveFromRouteComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public onDeleteWaypoint: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;



    ngOnInit() {
    }


    public onDeleteWaypointClicked() {
        this.onDeleteWaypoint.emit(this.waypoint);
    }
}
