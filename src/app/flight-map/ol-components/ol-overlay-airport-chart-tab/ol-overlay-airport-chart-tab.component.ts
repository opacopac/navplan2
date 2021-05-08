import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../open-aip/domain-model/airport';
import {AirportChart} from '../../../open-aip/domain-model/airport-chart';
import {Store} from '@ngrx/store';
import {LoadAdChartAction} from '../../../charts/ngrx/chart.actions';

@Component({
    selector: 'app-ol-overlay-airport-chart-tab',
    templateUrl: './ol-overlay-airport-chart-tab.component.html',
    styleUrls: ['./ol-overlay-airport-chart-tab.component.css']
})
export class OlOverlayAirportChartTabComponent implements OnInit {
    @Input() airport: Airport;


    constructor(private appStore: Store<any>) {
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


    public onChartClicked(id: number) {
        this.appStore.dispatch(new LoadAdChartAction(id));
    }
}
