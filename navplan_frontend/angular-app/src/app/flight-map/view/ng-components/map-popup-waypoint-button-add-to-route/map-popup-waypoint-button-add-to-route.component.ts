import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Flightroute} from '../../../../flightroute/domain/model/flightroute';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MiniFabButtonComponent} from '../../../../common/view/ng-components/mini-fab-button/mini-fab-button.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


@Component({
    selector: 'app-map-popup-waypoint-button-add-to-route',
    standalone: true,
    imports: [
        MiniFabButtonComponent,
        MatFormFieldModule,
        MatSelectModule
    ],
    templateUrl: './map-popup-waypoint-button-add-to-route.component.html',
    styleUrls: ['./map-popup-waypoint-button-add-to-route.component.scss']
})
export class MapPopupWaypointButtonAddToRouteComponent implements OnInit, OnChanges {
    @Input() public waypoint: Waypoint;
    @Input() public flightroute: Flightroute;
    @Output() public insertWaypointClick: EventEmitter<[Waypoint, number]> = new EventEmitter<[Waypoint, number]>();
    protected addAfterIndex: string;
    protected readonly ButtonColor = ButtonColor;


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
