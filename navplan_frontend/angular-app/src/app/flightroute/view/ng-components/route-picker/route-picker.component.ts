import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {Flightroute} from '../../../domain/model/flightroute';


@Component({
    selector: 'app-route-picker',
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
