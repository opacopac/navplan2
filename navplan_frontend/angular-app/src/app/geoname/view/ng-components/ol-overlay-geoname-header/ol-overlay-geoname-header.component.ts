import {Component, Input, OnInit} from '@angular/core';
import {Geoname} from '../../../domain/model/geoname';


@Component({
    selector: 'app-ol-overlay-geoname-header',
    templateUrl: './ol-overlay-geoname-header.component.html',
    styleUrls: ['./ol-overlay-geoname-header.component.css']
})
export class OlOverlayGeonameHeaderComponent implements OnInit {
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
