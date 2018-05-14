import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-map-overlay-button-close',
    templateUrl: './map-overlay-button-close.component.html',
    styleUrls: ['./map-overlay-button-close.component.css']
})
export class MapOverlayButtonCloseComponent implements OnInit {
    @Output() close = new EventEmitter();


    constructor() {
    }


    ngOnInit() {
    }


    public closeOverlay() {
        this.close.emit();
    }
}
