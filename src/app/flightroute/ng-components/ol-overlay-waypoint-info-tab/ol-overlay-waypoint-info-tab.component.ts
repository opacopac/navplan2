import {Component, Input, OnInit} from '@angular/core';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {WmmHelper} from '../../../common/geo-math/domain-service/wmm-helper';
import {Waypoint} from '../../domain-model/waypoint';


@Component({
    selector: 'app-ol-overlay-waypoint-info-tab',
    templateUrl: './ol-overlay-waypoint-info-tab.component.html',
    styleUrls: ['./ol-overlay-waypoint-info-tab.component.css']
})
export class OlOverlayWaypointInfoTabComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.waypoint.position);
    }


    public getVariationString(): string {
        const magVar = WmmHelper.calcMagneticVariation(this.waypoint.position);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
