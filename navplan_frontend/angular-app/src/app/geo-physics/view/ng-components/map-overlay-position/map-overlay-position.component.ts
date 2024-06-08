import {Component, Input, OnInit} from '@angular/core';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Position2d} from '../../../domain/model/geometry/position2d';


@Component({
    selector: 'app-map-overlay-position',
    templateUrl: './map-overlay-position.component.html',
    styleUrls: ['./map-overlay-position.component.scss']
})
export class MapOverlayPositionComponent implements OnInit {
    @Input() public position: Position2d;


    ngOnInit() {
    }


    public getPositionString(): string {
        return StringnumberHelper.getDmsString(this.position);
    }
}
