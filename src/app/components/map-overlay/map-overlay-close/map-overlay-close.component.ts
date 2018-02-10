import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map/map.service';


@Component({
    selector: 'app-map-overlay-close',
    templateUrl: './map-overlay-close.component.html',
    styleUrls: ['./map-overlay-close.component.css']
})
export class MapOverlayCloseComponent implements OnInit {
    constructor(private mapService: MapService) {
    }


    ngOnInit() {
    }


    public onCloseOverlayClicked() {
        this.mapService.closeOverlay();
    }
}
