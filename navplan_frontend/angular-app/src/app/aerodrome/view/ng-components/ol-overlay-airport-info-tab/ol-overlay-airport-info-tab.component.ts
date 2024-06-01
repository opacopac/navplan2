import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../domain/model/airport';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {IWmmService} from '../../../../geo-physics/domain/service/wmm/i-wmm.service';


@Component({
    selector: 'app-ol-overlay-airport-info-tab',
    templateUrl: './ol-overlay-airport-info-tab.component.html',
    styleUrls: ['./ol-overlay-airport-info-tab.component.scss']
})
export class OlOverlayAirportInfoTabComponent implements OnInit {
    @Input() public airport: Airport;


    public constructor(private wmmService: IWmmService) {
    }


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.airport.position);
    }


    public getVariationString(): string {
        const magVar = this.wmmService.calcMagneticVariation(this.airport.position);
        return StringnumberHelper.getEWString(magVar, 1);
    }


    public getElevationString(): string {
        return StringnumberHelper.getLengthString(this.airport.elevation.getHeightAmsl(), LengthUnit.FT); // TODO
    }
}
