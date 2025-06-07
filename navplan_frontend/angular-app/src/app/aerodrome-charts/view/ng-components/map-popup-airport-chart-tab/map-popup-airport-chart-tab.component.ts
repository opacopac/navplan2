import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../../aerodrome/domain/model/airport';
import {Store} from '@ngrx/store';
import {AirportChart} from '../../../domain/model/airport-chart';
import {AirportChartActions} from '../../../state/ngrx/airport-chart.actions';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlightMapActions} from '../../../../flight-map/state/ngrx/flight-map.actions';
import {MatTooltip} from '@angular/material/tooltip';


@Component({
    selector: 'app-map-popup-airport-chart-tab',
    standalone: true,
    imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatTooltip
    ],
    templateUrl: './map-popup-airport-chart-tab.component.html',
    styleUrls: ['./map-popup-airport-chart-tab.component.scss']
})
export class MapPopupAirportChartTabComponent implements OnInit {
    @Input() airport: Airport;


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected getChartColumns(): string[] {
        return ['filename', 'name', 'source'];
    }


    protected getChartSourceName(chart: AirportChart): string {
        switch (chart.source) {
            case 'AVARE': return 'Avare.ch';
            case 'VFRM': return 'swisstopo';
        }
    }


    protected getChartSourceUrl(chart: AirportChart): string {
        switch (chart.source) {
            case 'AVARE': return 'http://www.avare.ch/';
            case 'VFRM': return 'https://www.swisstopo.admin.ch/';
        }
    }


    protected onChartClicked(id: number) {
        this.appStore.dispatch(AirportChartActions.openAirportChart({ chartId: id }));
    }


    protected onAddChartClicked() {
        this.appStore.dispatch(FlightMapActions.showUploadChartSidebar({ selectedAirport: this.airport }));
    }
}
