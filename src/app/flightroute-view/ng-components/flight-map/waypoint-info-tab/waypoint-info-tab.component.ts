import {Component, Input, OnInit} from '@angular/core';
import {StringnumberHelper} from '../../../../system/domain-service/stringnumber/stringnumber-helper';
import {Waypoint} from '../../../../flightroute/domain-model/waypoint';
import {IWmmService} from '../../../../geo-physics/domain-service/wmm/i-wmm.service';


@Component({
    selector: 'app-waypoint-info-tab',
    templateUrl: './waypoint-info-tab.component.html',
    styleUrls: ['./waypoint-info-tab.component.css']
})
export class WaypointInfoTabComponent implements OnInit {
    @Input() public waypoint: Waypoint;


    public constructor(private wmmService: IWmmService) {
    }


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.waypoint.position);
    }


    public getVariationString(): string {
        const magVar = this.wmmService.calcMagneticVariation(this.waypoint.position);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
