import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {Flightroute} from '../../../../flightroute/domain/model/flightroute';
import {IconButtonComponent} from '../../../../common/view/ng-components/icon-button/icon-button.component';


@Component({
    selector: 'app-route-picker',
    standalone: true,
    imports: [
        IconButtonComponent
    ],
    templateUrl: './route-picker.component.html',
    styleUrls: ['./route-picker.component.scss']
})
export class RoutePickerComponent implements OnInit {
    @Input() currentRoute: Flightroute;
    @Input() labelText: string;
    @Input() showRouteName: boolean;
    @Input() showIcon: boolean;
    @Output() pickFlightrouteClicked = new EventEmitter<void>();

    protected readonly ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }
}
