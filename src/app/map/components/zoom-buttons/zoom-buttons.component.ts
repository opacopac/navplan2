import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';


@Component({
    selector: 'app-zoom-buttons',
    templateUrl: './zoom-buttons.component.html',
    styleUrls: ['./zoom-buttons.component.css']
})
export class ZoomButtonsComponent implements OnInit {
    @Output() onZoomInClicked = new EventEmitter<null>();
    @Output() onZoomOutClicked = new EventEmitter<null>();
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }
}
