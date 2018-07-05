import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../core/services/map/map.service';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';


@Component({
    selector: 'app-zoom-buttons',
    templateUrl: './zoom-buttons.component.html',
    styleUrls: ['./zoom-buttons.component.css']
})
export class ZoomButtonsComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor(public mapService: MapService) {
    }


    ngOnInit() {
    }
}
