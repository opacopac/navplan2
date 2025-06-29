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
import {ButtonColor} from '../../../../common/view/model/button-color';
import {IconButtonComponent} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {Webcam} from '../../../../webcam/domain/model/webcam';
import {Store} from '@ngrx/store';
import {WebcamActions} from '../../../../webcam/state/ngrx/webcam.actions';


@Component({
    selector: 'app-map-popup-airport-info-tab',
    imports: [
        MatIconModule,
        MapOverlayElevationComponent,
        MapOverlayPositionComponent,
        MapOverlayVariationComponent,
        IconButtonComponent,
    ],
    templateUrl: './map-popup-airport-info-tab.component.html',
    styleUrls: ['./map-popup-airport-info-tab.component.scss']
})
export class MapPopupAirportInfoTabComponent implements OnInit {
    @Input() public airport: Airport;

    protected readonly ButtonColor = ButtonColor;


    public constructor(
        private appStore: Store<any>,
    ) {
    }


    ngOnInit() {
    }


    protected onWebcamClicked(webcam: Webcam) {
        this.appStore.dispatch(WebcamActions.show({webcam: webcam}));
    }
}
