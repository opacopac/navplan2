import {Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MiniFabButtonComponent} from '../../../../common/view/ng-components/mini-fab-button/mini-fab-button.component';


@Component({
    selector: 'app-map-popup-waypoint-button-set-alternate',
    imports: [
        MiniFabButtonComponent
    ],
    templateUrl: './map-popup-waypoint-button-set-alternate.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./map-popup-waypoint-button-set-alternate.component.scss']
})
export class MapPopupWaypointButtonSetAlternateComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public setAlternateClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();

    protected readonly ButtonColor = ButtonColor;


    ngOnInit() {
    }
}
