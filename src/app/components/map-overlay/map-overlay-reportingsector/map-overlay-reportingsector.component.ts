import { Component, Input, OnInit } from '@angular/core';
import { Reportingsector } from '../../../model/reportingsector';

@Component({
    selector: 'app-map-overlay-reportingsector',
    templateUrl: './map-overlay-reportingsector.component.html',
    styleUrls: ['./map-overlay-reportingsector.component.css']
})
export class MapOverlayReportingsectorComponent implements OnInit {
    @Input() reportingsector: Reportingsector;


    constructor() {
    }


    ngOnInit() {
    }
}
