import {Component, Input, OnInit} from '@angular/core';
import {ReportingPoint} from '../../../domain/model/reporting-point';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {GeoPhysicsViewModule} from '../../../../geo-physics/view/geo-physics-view.module';


@Component({
    selector: 'app-map-popup-reportingpoint-info-tab',
    standalone: true,
    imports: [
        GeoPhysicsViewModule
    ],
    templateUrl: './map-popup-reportingpoint-info-tab.component.html',
    styleUrls: ['./map-popup-reportingpoint-info-tab.component.scss']
})
export class MapPopupReportingpointInfoTabComponent implements OnInit {
    @Input() public reportingpoint: ReportingPoint;


    ngOnInit() {
    }


    public getElevationString(elevation: Length): string {
        return StringnumberHelper.getLengthString(elevation, LengthUnit.FT); // TODO
    }
}
