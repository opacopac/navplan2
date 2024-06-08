import {Component, Input, OnInit} from '@angular/core';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {LengthUnit} from '../../../domain/model/quantities/length-unit';
import {Altitude} from '../../../domain/model/geometry/altitude';


@Component({
    selector: 'app-map-overlay-elevation',
    templateUrl: './map-overlay-elevation.component.html',
    styleUrls: ['./map-overlay-elevation.component.scss']
})
export class MapOverlayElevationComponent implements OnInit {
    @Input() public altitude: Altitude;


    ngOnInit() {
    }


    public getElevationString(): string {
        return StringnumberHelper.getLengthString(this.altitude.getHeightAmsl(), LengthUnit.FT); // TODO
    }
}
