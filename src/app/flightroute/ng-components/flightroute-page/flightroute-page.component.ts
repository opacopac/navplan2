import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ExporterActions} from '../../../exporter/ngrx/exporter.actions';


@Component({
    selector: 'app-flightroute-page',
    templateUrl: './flightroute-page.component.html',
    styleUrls: ['./flightroute-page.component.css'],
})
export class FlightroutePageComponent implements OnInit {


    constructor(private appStore: Store<any>) {
    }

    ngOnInit() {
    }


    public onExportFlightroutePdfClick() {
        this.appStore.dispatch(ExporterActions.exportPdf());
    }


    public onExportFlightrouteExcelClick() {
        this.appStore.dispatch(ExporterActions.exportExcel());
    }
}
