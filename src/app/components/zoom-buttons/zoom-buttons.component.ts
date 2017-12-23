import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';


@Component({
    selector: 'app-zoom-buttons',
    templateUrl: './zoom-buttons.component.html',
    styleUrls: ['./zoom-buttons.component.css']
})
export class ZoomButtonsComponent implements OnInit {
    constructor(public mapService: MapService) {
    }


    ngOnInit() {
    }
}
