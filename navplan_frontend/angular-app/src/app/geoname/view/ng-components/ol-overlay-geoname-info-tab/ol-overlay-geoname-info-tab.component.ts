import {Component, Input, OnInit} from '@angular/core';
import {Geoname} from '../../../domain/model/geoname';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {IWmmService} from '../../../../geo-physics/domain/service/wmm/i-wmm.service';


@Component({
    selector: 'app-ol-overlay-geoname-info-tab',
    templateUrl: './ol-overlay-geoname-info-tab.component.html',
    styleUrls: ['./ol-overlay-geoname-info-tab.component.scss']
})
export class OlOverlayGeonameInfoTabComponent implements OnInit {
    @Input() public geoname: Geoname;


    public constructor(private wmmService: IWmmService) {
    }


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.geoname.position);
    }


    public getVariationString(): string {
        const magVar = this.wmmService.calcMagneticVariation(this.geoname.position);
        return StringnumberHelper.getEWString(magVar, 1);;
    }


    public getElevationString(): string {
        return StringnumberHelper.getLengthString(this.geoname.elevation, LengthUnit.FT); // TODO
    }
}
