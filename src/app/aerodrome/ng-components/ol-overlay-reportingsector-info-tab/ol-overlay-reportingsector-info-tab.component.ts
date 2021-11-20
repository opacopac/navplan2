import {Component, Input, OnInit} from '@angular/core';
import {ReportingSector} from '../../domain-model/reporting-sector';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';
import {Length} from '../../../common/geo-math/domain-model/quantities/length';
import {LengthUnit} from '../../../common/geo-math/domain-model/quantities/length-unit';


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
