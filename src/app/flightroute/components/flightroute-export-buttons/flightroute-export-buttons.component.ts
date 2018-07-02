import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-flightroute-exports',
    templateUrl: './flightroute-export-buttons.component.html',
    styleUrls: ['./flightroute-export-buttons.component.css']
})
export class FlightrouteExportButtonsComponent implements OnInit {
    @Output() onExportFlightroutePdfClicked = new EventEmitter<number>();
    @Output() onExportFlightrouteExcelClicked = new EventEmitter<number>();


    constructor() {
    }


    ngOnInit() {
    }
}
