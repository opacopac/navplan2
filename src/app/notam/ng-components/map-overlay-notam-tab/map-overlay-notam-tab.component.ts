import {Component, Input, OnInit} from '@angular/core';
import {Notam} from '../../domain-model/notam';


@Component({
    selector: 'app-map-overlay-notam-tab',
    templateUrl: './map-overlay-notam-tab.component.html',
    styleUrls: ['./map-overlay-notam-tab.component.css']
})
export class MapOverlayNotamTabComponent implements OnInit {
    @Input() notams: Notam[];


    constructor() {
    }


    ngOnInit() {
    }
}
