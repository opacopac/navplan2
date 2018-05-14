import { Component, OnInit } from '@angular/core';
import { Position2d } from '../../../model/position';
import { DataItem } from '../../../model/data-item';


@Component({
    selector: 'app-map-overlay-meteogram',
    templateUrl: './map-overlay-meteogram.component.html',
    styleUrls: ['./map-overlay-meteogram.component.css']
})
export class MapOverlayMeteogramComponent implements OnInit {
    constructor() {
    }


    ngOnInit() {
    }


    public bindFeatureData(dataItem: DataItem) {
        // TODO
    }


    public getTitle(): string {
        return 'TODO';
    }


    public getPosition(clickPos: Position2d): Position2d {
        // TODO
        return undefined;
    }
}
