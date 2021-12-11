import {Component, Input, OnInit} from '@angular/core';
import {UserPoint} from '../../../../user/domain-model/user-point';
import {StringnumberHelper} from '../../../../system/domain-service/stringnumber/stringnumber-helper';
import {IWmmService} from '../../../../geo-physics/domain-service/wmm/i-wmm.service';


@Component({
    selector: 'app-ol-overlay-userpoint-info-tab',
    templateUrl: './ol-overlay-userpoint-info-tab.component.html',
    styleUrls: ['./ol-overlay-userpoint-info-tab.component.css']
})
export class OlOverlayUserpointInfoTabComponent implements OnInit {
    @Input() public userpoint: UserPoint;


    public constructor(private wmmService: IWmmService) {
    }


    ngOnInit() {
    }

    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.userpoint.position);
    }


    public getVariationString(): string {
        const magVar = this.wmmService.calcMagneticVariation(this.userpoint.position);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
