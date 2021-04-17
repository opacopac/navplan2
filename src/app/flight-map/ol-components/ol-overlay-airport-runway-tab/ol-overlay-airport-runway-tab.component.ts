import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../open-aip/domain-model/airport';
import {AirportRunway} from '../../../open-aip/domain-model/airport-runway';


@Component({
    selector: 'app-ol-overlay-airport-runway-tab',
    templateUrl: './ol-overlay-airport-runway-tab.component.html',
    styleUrls: ['./ol-overlay-airport-runway-tab.component.css']
})
export class OlOverlayAirportRunwayTabComponent implements OnInit {
    @Input() airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }


    public getRwyColumns(): string[] {
        return ['runway', 'surface', 'dimensions', 'tora', 'lda', 'papi'];
    }


    public getRwyDimensionsString(runway: AirportRunway): string {
        return Math.round(runway.length.m) + ' x ' + Math.round(runway.width.m) + 'm';
    }
}
