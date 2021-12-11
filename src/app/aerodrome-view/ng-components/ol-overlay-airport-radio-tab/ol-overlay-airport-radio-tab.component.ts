import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../aerodrome/domain-model/airport';


@Component({
    selector: 'app-ol-overlay-airport-radio-tab',
    templateUrl: './ol-overlay-airport-radio-tab.component.html',
    styleUrls: ['./ol-overlay-airport-radio-tab.component.css']
})
export class OlOverlayAirportRadioTabComponent implements OnInit {
    @Input() airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }


    public getRadioColumns(): string[] {
        return ['type', 'frequency'];
    }
}
