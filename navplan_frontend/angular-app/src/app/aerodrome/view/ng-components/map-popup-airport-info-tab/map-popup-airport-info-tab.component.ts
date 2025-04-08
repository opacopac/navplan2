import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../domain/model/airport';
import {GeoPhysicsViewModule} from '../../../../geo-physics/view/geo-physics-view.module';
import {MatIconModule} from '@angular/material/icon';


@Component({
    selector: 'app-map-popup-airport-info-tab',
    standalone: true,
    imports: [
        MatIconModule,
        GeoPhysicsViewModule,
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
