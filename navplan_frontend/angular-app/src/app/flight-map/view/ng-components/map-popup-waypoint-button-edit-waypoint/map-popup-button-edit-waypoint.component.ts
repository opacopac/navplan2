import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MiniFabButtonComponent} from '../../../../common/view/ng-components/mini-fab-button/mini-fab-button.component';


@Component({
    selector: 'app-map-popup-waypoint-button-edit-waypoint',
    standalone: true,
    imports: [
        MiniFabButtonComponent
    ],
    templateUrl: './map-popup-button-edit-waypoint.component.html',
    styleUrls: ['./map-popup-button-edit-waypoint.component.scss']
})
export class MapPopupButtonEditWaypointComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public editWaypointClick = new EventEmitter<Waypoint>();

    protected readonly ButtonColor = ButtonColor;


    ngOnInit() {
    }
}
