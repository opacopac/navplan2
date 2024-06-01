import {Component, Input, OnInit} from '@angular/core';
import {ReportingPoint} from '../../../domain/model/reporting-point';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-ol-overlay-reportingpoint-info-tab',
    templateUrl: './ol-overlay-reportingpoint-info-tab.component.html',
    styleUrls: ['./ol-overlay-reportingpoint-info-tab.component.scss']
})
export class OlOverlayReportingpointInfoTabComponent implements OnInit {
    @Input() public reportingpoint: ReportingPoint;


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.reportingpoint.position);
    }


    public getElevationString(elevation: Length): string {
        return StringnumberHelper.getLengthString(elevation, LengthUnit.FT); // TODO
    }
}
