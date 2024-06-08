import {Component, Input, OnInit} from '@angular/core';
import {Geoname} from '../../../domain/model/geoname';


@Component({
    selector: 'app-map-popup-geoname-info-tab',
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
