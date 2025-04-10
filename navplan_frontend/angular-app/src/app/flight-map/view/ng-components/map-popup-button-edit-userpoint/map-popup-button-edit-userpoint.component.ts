import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MiniFabButtonComponent} from '../../../../common/view/ng-components/mini-fab-button/mini-fab-button.component';


@Component({
    selector: 'app-map-popup-button-edit-userpoint',
    standalone: true,
    imports: [
        MiniFabButtonComponent
    ],
    templateUrl: './map-popup-button-edit-userpoint.component.html',
    styleUrls: ['./map-popup-button-edit-userpoint.component.scss']
})
export class MapPopupButtonEditUserpointComponent implements OnInit {
    @Input() public waypoint: Waypoint;
    @Output() public editUserpointClick: EventEmitter<Waypoint> = new EventEmitter<Waypoint>();

    protected readonly ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }
}
