import {Component, Input, OnInit} from '@angular/core';
import {Geoname} from '../../domain-model/geoname';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {WmmHelper} from '../../../common/geo-math/domain-service/wmm-helper';
import {LengthUnit} from '../../../common/geo-math/domain-model/quantities/length-unit';


@Component({
    selector: 'app-ol-overlay-geoname-info-tab',
    templateUrl: './ol-overlay-geoname-info-tab.component.html',
    styleUrls: ['./ol-overlay-geoname-info-tab.component.css']
})
export class OlOverlayGeonameInfoTabComponent implements OnInit {
    @Input() public geoname: Geoname;


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.geoname.position);
    }


    public getVariationString(): string {
        const magVar = WmmHelper.calcMagneticVariation(this.geoname.position);
        return StringnumberHelper.getEWString(magVar, 1);;
    }


    public getElevationString(): string {
        return StringnumberHelper.getLengthString(this.geoname.elevation, LengthUnit.FT); // TODO
    }
}
