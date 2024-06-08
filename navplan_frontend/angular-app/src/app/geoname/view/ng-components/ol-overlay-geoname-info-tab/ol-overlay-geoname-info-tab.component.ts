import {Component, Input, OnInit} from '@angular/core';
import {Geoname} from '../../../domain/model/geoname';


@Component({
    selector: 'app-ol-overlay-geoname-info-tab',
    templateUrl: './ol-overlay-geoname-info-tab.component.html',
    styleUrls: ['./ol-overlay-geoname-info-tab.component.scss']
})
export class OlOverlayGeonameInfoTabComponent implements OnInit {
    @Input() public geoname: Geoname;


    public constructor() {
    }


    ngOnInit() {
    }
}
