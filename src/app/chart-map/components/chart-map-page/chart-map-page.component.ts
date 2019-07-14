import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {OlMapContext} from '../../../ol-map/domain/ol-map-context';
import {OlChartPathContainer} from '../../ol/ol-chart-path-container';


@Component({
    selector: 'app-chart-map-page',
    templateUrl: './chart-map-page.component.html',
    styleUrls: ['./chart-map-page.component.css']
})
export class ChartMapPageComponent implements OnInit {
    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onMapInitCompleted(mapContext: OlMapContext) {
        const chartPathContainer = new OlChartPathContainer(mapContext);
    }
}
