import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../aerodrome/domain-model/airport';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {WmmHelper} from '../../../common/geo-math/domain-service/wmm-helper';
import {LengthUnit} from '../../../common/geo-math/domain-model/quantities/units';


@Component({
    selector: 'app-ol-overlay-airport-info-tab',
    templateUrl: './ol-overlay-airport-info-tab.component.html',
    styleUrls: ['./ol-overlay-airport-info-tab.component.css']
})
export class OlOverlayAirportInfoTabComponent implements OnInit {
    @Input() public airport: Airport;


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.airport.position);
    }


    public getVariationString(): string {
        const magVar = WmmHelper.calcMagneticVariation(this.airport.position);
        return StringnumberHelper.getEWString(magVar, 1);
    }


    public getElevationString(): string {
        return StringnumberHelper.getLengthString(this.airport.elevation, LengthUnit.FT); // TODO
    }
}
