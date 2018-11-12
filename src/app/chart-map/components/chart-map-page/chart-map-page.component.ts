import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {BaseMapContext} from '../../../base-map/model/base-map-context';


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


    public onMapInitCompleted(mapContext: BaseMapContext) {
    }
}
