import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../open-aip/domain/airport';
import {AirportChart} from '../../../open-aip/domain/airport-chart';

@Component({
    selector: 'app-ol-overlay-airport-chart-tab',
    templateUrl: './ol-overlay-airport-chart-tab.component.html',
    styleUrls: ['./ol-overlay-airport-chart-tab.component.css']
})
export class OlOverlayAirportChartTabComponent implements OnInit {
    @Input() airport: Airport;


    constructor() {
    }


    ngOnInit() {
    }


    public getChartSourceName(chart: AirportChart): string {
        switch (chart.source) {
            case 'AVARE': return 'Avare.ch';
            case 'VFRM': return 'swisstopo';
        }
    }


    public getChartSourceUrl(chart: AirportChart): string {
        switch (chart.source) {
            case 'AVARE': return 'http://www.avare.ch/';
            case 'VFRM': return 'https://www.swisstopo.admin.ch/';
        }
    }
}
