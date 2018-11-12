import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-flightroute-export-buttons',
    templateUrl: './flightroute-export-buttons.component.html',
    styleUrls: ['./flightroute-export-buttons.component.css']
})
export class FlightrouteExportButtonsComponent implements OnInit {
    @Output() onExportFlightroutePdfClick = new EventEmitter<number>();
    @Output() onExportFlightrouteExcelClick = new EventEmitter<number>();


    constructor() {
    }


    ngOnInit() {
    }
}
