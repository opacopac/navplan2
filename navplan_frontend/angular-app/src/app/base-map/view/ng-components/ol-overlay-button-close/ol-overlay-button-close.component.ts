import {Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy} from '@angular/core';


@Component({
    selector: 'app-ol-overlay-button-close',
    imports: [],
    templateUrl: './ol-overlay-button-close.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
