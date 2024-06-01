import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Flightroute} from '../../../../domain/model/flightroute';
import {Waypoint} from '../../../../domain/model/waypoint';


@Component({
    selector: 'app-waypoint-button-add-to-route',
    templateUrl: './waypoint-button-add-to-route.component.html',
    styleUrls: ['./waypoint-button-add-to-route.component.scss']
})
export class WaypointButtonAddToRouteComponent implements OnInit, OnChanges {
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
