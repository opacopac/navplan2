import { Component, Input, OnInit } from '@angular/core';
import { ButtonColor, ButtonSize } from '../../../shared/directives/button-base/button-base.directive';
import { MetarTaf } from '../../model/metar-taf';


@Component({
    selector: 'app-ol-overlay-button-metar-taf',
    templateUrl: './ol-overlay-button-metar-taf.component.html',
    styleUrls: ['./ol-overlay-button-metar-taf.component.css']
})
export class OlOverlayButtonMetarTafComponent implements OnInit {
    @Input() metarTaf: MetarTaf;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    public onShowMetarTaf() {
        // TODO
    }
}
