import {Component, Input, OnInit} from '@angular/core';
import {UserPoint} from '../../../../user/domain-model/user-point';
import {StringnumberHelper} from '../../../../system/domain-service/stringnumber/stringnumber-helper';
import {WmmHelper} from '../../../../common/geo-math/domain-service/wmm-helper';


@Component({
    selector: 'app-ol-overlay-userpoint-info-tab',
    templateUrl: './ol-overlay-userpoint-info-tab.component.html',
    styleUrls: ['./ol-overlay-userpoint-info-tab.component.css']
})
export class OlOverlayUserpointInfoTabComponent implements OnInit {
    @Input() public userpoint: UserPoint;


    ngOnInit() {
    }

    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.userpoint.position);
    }


    public getVariationString(): string {
        const magVar = WmmHelper.calcMagneticVariation(this.userpoint.position);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
