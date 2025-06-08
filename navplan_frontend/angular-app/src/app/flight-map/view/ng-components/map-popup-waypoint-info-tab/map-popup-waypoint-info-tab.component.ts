import {Component, Input, OnInit} from '@angular/core';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {
    MapOverlayPositionComponent
} from '../../../../geo-physics/view/ng-components/map-overlay-position/map-overlay-position.component';
import {
    MapOverlayVariationComponent
} from '../../../../geo-physics/view/ng-components/map-overlay-variation/map-overlay-variation.component';


@Component({
    selector: 'app-map-popup-waypoint-info-tab',
    imports: [
        MapOverlayPositionComponent,
        MapOverlayVariationComponent
    ],
    templateUrl: './map-popup-waypoint-info-tab.component.html',
    styleUrls: ['./map-popup-waypoint-info-tab.component.scss']
})
export class MapPopupWaypointInfoTabComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    ngOnInit() {
    }
}
