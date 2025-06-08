import {Component, Input, OnInit} from '@angular/core';
import {ReportingSector} from '../../../domain/model/reporting-sector';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-map-popup-reportingsector-info-tab',
    imports: [],
    templateUrl: './map-popup-reportingsector-info-tab.component.html',
    styleUrls: ['./map-popup-reportingsector-info-tab.component.scss']
})
export class MapPopupReportingsectorInfoTabComponent implements OnInit {
    @Input() public reportingsector: ReportingSector;


    ngOnInit() {
    }


    public getElevationString(elevation: Length): string {
        return StringnumberHelper.getLengthString(elevation, LengthUnit.FT); // TODO
    }
}
