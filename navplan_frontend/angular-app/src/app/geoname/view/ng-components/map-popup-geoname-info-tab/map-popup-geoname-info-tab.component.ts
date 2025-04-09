import {Component, Input, OnInit} from '@angular/core';
import {Geoname} from '../../../domain/model/geoname';
import {MapOverlayPositionComponent} from '../../../../geo-physics/view/ng-components/map-overlay-position/map-overlay-position.component';
import {
    MapOverlayElevationComponent
} from '../../../../geo-physics/view/ng-components/map-overlay-elevation/map-overlay-elevation.component';
import {
    MapOverlayVariationComponent
} from '../../../../geo-physics/view/ng-components/map-overlay-variation/map-overlay-variation.component';


@Component({
    selector: 'app-map-popup-geoname-info-tab',
    standalone: true,
    imports: [
        MapOverlayPositionComponent,
        MapOverlayElevationComponent,
        MapOverlayVariationComponent
    ],
    templateUrl: './map-popup-geoname-info-tab.component.html',
    styleUrls: ['./map-popup-geoname-info-tab.component.scss']
})
export class MapPopupGeonameInfoTabComponent implements OnInit {
    @Input() public geoname: Geoname;


    public constructor() {
    }


    ngOnInit() {
    }
}
