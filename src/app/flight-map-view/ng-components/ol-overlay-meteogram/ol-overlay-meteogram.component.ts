import {Component, OnInit} from '@angular/core';
import {Position2d} from '../../../geo-physics/domain-model/geometry/position2d';
import {DataItem} from '../../../common/model/data-item';


@Component({
    selector: 'app-ol-overlay-meteogram',
    templateUrl: './ol-overlay-meteogram.component.html',
    styleUrls: ['./ol-overlay-meteogram.component.css']
})
export class OlOverlayMeteogramComponent implements OnInit {
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
