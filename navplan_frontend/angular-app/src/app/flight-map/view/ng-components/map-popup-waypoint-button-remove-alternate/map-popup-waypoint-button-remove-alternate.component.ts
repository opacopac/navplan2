import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MiniFabButtonComponent} from '../../../../common/view/ng-components/mini-fab-button/mini-fab-button.component';


@Component({
    selector: 'app-map-popup-waypoint-button-remove-alternate',
    standalone: true,
    imports: [
        MiniFabButtonComponent
    ],
    templateUrl: './map-popup-waypoint-button-remove-alternate.component.html',
    styleUrls: ['./map-popup-waypoint-button-remove-alternate.component.scss']
})
export class MapPopupWaypointButtonRemoveAlternateComponent implements OnInit {
    @Output() public removeAlternateClick: EventEmitter<null> = new EventEmitter<null>();

    protected readonly ButtonColor = ButtonColor;


    ngOnInit() {
    }
}
