import {Component, Input, OnInit} from '@angular/core';
import {Geoname} from '../../../domain/model/geoname';


@Component({
    selector: 'app-map-popup-geoname-header',
    templateUrl: './map-popup-geoname-header.component.html',
    styleUrls: ['./map-popup-geoname-header.component.scss']
})
export class MapPopupGeonameHeaderComponent implements OnInit {
    @Input() public geoname: Geoname;


    ngOnInit() {
    }


    public getTypeString(): string {
        if (this.geoname.feature_class === 'P') {
            return this.geoname.getClassDescription();
        } else {
            return this.geoname.getFeatureDescription();
        }
    }


    public getAdminString(): string {
        if (this.geoname.admin1) {
            return this.geoname.admin1 + ', ' + this.geoname.country;
        } else {
            return this.geoname.country;
        }
    }
}
