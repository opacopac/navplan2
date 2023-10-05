import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-zoom-buttons',
    templateUrl: './zoom-buttons.component.html',
    styleUrls: ['./zoom-buttons.component.css']
})
export class ZoomButtonsComponent implements OnInit {
    @Output() zoomInClick = new EventEmitter<null>();
    @Output() zoomOutClick = new EventEmitter<null>();


    constructor() {
    }


    ngOnInit() {
    }
}
