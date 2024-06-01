import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-ol-overlay-button-close',
    templateUrl: './ol-overlay-button-close.component.html',
    styleUrls: ['./ol-overlay-button-close.component.scss']
})
export class OlOverlayButtonCloseComponent implements OnInit {
    @Output() close = new EventEmitter();


    constructor() {
    }


    ngOnInit() {
    }


    public closeOverlay() {
        this.close.emit();
    }
}
