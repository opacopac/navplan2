import {Component, Input, OnInit} from '@angular/core';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Position2d} from '../../../domain/model/geometry/position2d';
import {IWmmService} from '../../../domain/service/wmm/i-wmm.service';


@Component({
    selector: 'app-map-overlay-variation',
    imports: [],
    templateUrl: './map-overlay-variation.component.html',
    styleUrls: ['./map-overlay-variation.component.scss']
})
export class MapOverlayVariationComponent implements OnInit {
    @Input() public position: Position2d;


    public constructor(private wmmService: IWmmService) {
    }


    ngOnInit() {
    }


    public getVariationString(): string {
        const magVar = this.wmmService.calcMagneticVariation(this.position);
        return StringnumberHelper.getEWString(magVar, 1);
    }
}
