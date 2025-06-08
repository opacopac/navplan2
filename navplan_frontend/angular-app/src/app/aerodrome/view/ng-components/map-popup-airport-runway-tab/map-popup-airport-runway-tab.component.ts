import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../domain/model/airport';
import {AirportRunway} from '../../../domain/model/airport-runway';
import {MatTableModule} from '@angular/material/table';


@Component({
    selector: 'app-map-popup-airport-runway-tab',
    imports: [
        MatTableModule
    ],
    templateUrl: './map-popup-airport-runway-tab.component.html',
    styleUrls: ['./map-popup-airport-runway-tab.component.scss']
})
export class MapPopupAirportRunwayTabComponent implements OnInit {
    @Input() airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }


    public getRwyColumns(): string[] {
        return ['runway', 'surface', 'dimensions', 'tora', 'lda', 'papi'];
    }


    public getRwyDimensionsString(runway: AirportRunway): string {
        return Math.round(runway.length.m) + ' x ' + Math.round(runway.width.m);
    }
}
