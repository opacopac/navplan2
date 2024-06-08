import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../domain/model/airport';


@Component({
    selector: 'app-map-popup-airport-info-tab',
    templateUrl: './map-popup-airport-info-tab.component.html',
    styleUrls: ['./map-popup-airport-info-tab.component.scss']
})
export class MapPopupAirportInfoTabComponent implements OnInit {
    @Input() public airport: Airport;


    public constructor() {
    }


    ngOnInit() {
    }
}
