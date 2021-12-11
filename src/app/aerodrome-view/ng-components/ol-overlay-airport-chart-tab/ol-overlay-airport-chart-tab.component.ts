import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../aerodrome/domain-model/airport';
import {Store} from '@ngrx/store';
import {AirportChart} from '../../../aerodrome/domain-model/airport-chart';
import {AirportChartActions} from '../../../aerodrome-state/ngrx/airport-chart/airport-chart.actions';


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


    public getChartColumns(): string[] {
        return ['filename', 'type', 'source'];
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
        this.appStore.dispatch(AirportChartActions.openAirportChart({ chartId: id }));
    }
}
