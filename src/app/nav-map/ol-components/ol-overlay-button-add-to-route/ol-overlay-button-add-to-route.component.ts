import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Flightroute} from '../../../flightroute/domain/flightroute';
import {Waypoint} from '../../../flightroute/domain/waypoint';


@Component({
    selector: 'app-ol-overlay-button-add-to-route',
    templateUrl: './ol-overlay-button-add-to-route.component.html',
    styleUrls: ['./ol-overlay-button-add-to-route.component.css']
})
export class OlOverlayButtonAddToRouteComponent implements OnInit, OnChanges {
    @Input() public waypoint: Waypoint;
    @Input() public flightroute: Flightroute;
    @Output() public insertWaypointClick: EventEmitter<[Waypoint, number]> = new EventEmitter<[Waypoint, number]>();
    public addAfterIndex: string;


    ngOnInit() {
    }


    ngOnChanges() {
        // set initial dropdown selection
        if (this.flightroute && this.flightroute.waypoints.length > 0) {
            this.addAfterIndex = (this.flightroute.waypoints.length + 1).toString();
        } else {
            this.addAfterIndex = '0';
        }
    }


    public onAddSelectedWaypointClicked() {
        this.insertWaypointClick.emit([this.waypoint, parseInt(this.addAfterIndex, 10)]);
    }
}
