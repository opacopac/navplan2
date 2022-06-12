import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ExporterActions} from '../../../state/ngrx/exporter.actions';


@Component({
    selector: 'app-flightroute-export-buttons',
    templateUrl: './flightroute-export-buttons.component.html',
    styleUrls: ['./flightroute-export-buttons.component.css']
})
export class FlightrouteExportButtonsComponent implements OnInit {
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
