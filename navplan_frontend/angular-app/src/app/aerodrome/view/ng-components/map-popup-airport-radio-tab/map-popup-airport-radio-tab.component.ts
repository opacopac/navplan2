import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../domain/model/airport';
import {Frequency} from '../../../../geo-physics/domain/model/quantities/frequency';


@Component({
    selector: 'app-map-popup-airport-radio-tab',
    templateUrl: './map-popup-airport-radio-tab.component.html',
    styleUrls: ['./map-popup-airport-radio-tab.component.scss']
})
export class MapPopupAirportRadioTabComponent implements OnInit {
    @Input() airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }


    public getRadioColumns(): string[] {
        return ['type', 'frequency'];
    }


    public getFrequencyString(frequency: Frequency): string {
        return frequency.getValueString() + ' ' + frequency.getUnitString();
    }
}
