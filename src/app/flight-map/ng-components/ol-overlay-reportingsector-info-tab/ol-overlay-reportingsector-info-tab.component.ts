import {Component, Input, OnInit} from '@angular/core';
import {ReportingSector} from '../../../aerodrome/domain-model/reporting-sector';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {LengthUnit} from '../../../common/geo-math/domain-model/quantities/units';
import {Length} from '../../../common/geo-math/domain-model/quantities/length';


@Component({
    selector: 'app-ol-overlay-reportingsector-info-tab',
    templateUrl: './ol-overlay-reportingsector-info-tab.component.html',
    styleUrls: ['./ol-overlay-reportingsector-info-tab.component.css']
})
export class OlOverlayReportingsectorInfoTabComponent implements OnInit {
    @Input() public reportingsector: ReportingSector;


    ngOnInit() {
    }


    public getElevationString(elevation: Length): string {
        return StringnumberHelper.getLengthString(elevation, LengthUnit.FT); // TODO
    }
}
