import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../domain/model/airport';


@Component({
    selector: 'app-ol-overlay-airport-info-tab',
    templateUrl: './ol-overlay-airport-info-tab.component.html',
    styleUrls: ['./ol-overlay-airport-info-tab.component.scss']
})
export class OlOverlayAirportInfoTabComponent implements OnInit {
    @Input() public airport: Airport;


    public constructor() {
    }


    ngOnInit() {
    }
}
