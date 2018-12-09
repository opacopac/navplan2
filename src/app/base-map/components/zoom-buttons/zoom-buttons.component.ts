import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-zoom-buttons',
    templateUrl: './zoom-buttons.component.html',
    styleUrls: ['./zoom-buttons.component.css']
})
export class ZoomButtonsComponent implements OnInit {
    @Output() onZoomInClicked = new EventEmitter<null>();
    @Output() onZoomOutClicked = new EventEmitter<null>();


    constructor() {
    }


    ngOnInit() {
    }
}
