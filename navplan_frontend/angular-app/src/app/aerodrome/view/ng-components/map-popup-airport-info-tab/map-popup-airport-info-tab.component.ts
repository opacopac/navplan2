import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../domain/model/airport';
import {MatIconModule} from '@angular/material/icon';
import {
    MapOverlayElevationComponent
} from '../../../../geo-physics/view/ng-components/map-overlay-elevation/map-overlay-elevation.component';
import {
    MapOverlayPositionComponent
} from '../../../../geo-physics/view/ng-components/map-overlay-position/map-overlay-position.component';
import {
    MapOverlayVariationComponent
} from '../../../../geo-physics/view/ng-components/map-overlay-variation/map-overlay-variation.component';


@Component({
    selector: 'app-map-popup-airport-info-tab',
    imports: [
        MatIconModule,
        MapOverlayElevationComponent,
        MapOverlayPositionComponent,
        MapOverlayVariationComponent,
    ],
    templateUrl: './map-popup-airport-info-tab.component.html',
    styleUrls: ['./map-popup-airport-info-tab.component.scss']
})
export class MapPopupAirportInfoTabComponent implements OnInit {
    @Input() public airport: Airport;


    public constructor() {
    }


    ngOnInit() {
    }
}
