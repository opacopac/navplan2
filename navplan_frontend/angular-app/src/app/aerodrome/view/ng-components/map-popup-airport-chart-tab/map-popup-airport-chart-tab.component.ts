import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../domain/model/airport';
import {Store} from '@ngrx/store';
import {AirportChart} from '../../../domain/model/airport-chart';
import {AirportChartActions} from '../../../state/ngrx/airport-chart/airport-chart.actions';


@Component({
    selector: 'app-map-popup-airport-chart-tab',
    templateUrl: './map-popup-airport-chart-tab.component.html',
    styleUrls: ['./map-popup-airport-chart-tab.component.scss']
})
export class MapPopupAirportChartTabComponent implements OnInit {
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
