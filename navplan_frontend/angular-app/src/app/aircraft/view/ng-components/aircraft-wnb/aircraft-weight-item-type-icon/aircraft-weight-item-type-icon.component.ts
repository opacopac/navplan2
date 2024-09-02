import {Component, Input, OnInit} from '@angular/core';
import {WeightItemType} from '../../../../domain/model/weight-item-type';


@Component({
    selector: 'app-aircraft-weight-item-type-icon',
    templateUrl: './aircraft-weight-item-type-icon.component.html',
    styleUrls: ['./aircraft-weight-item-type-icon.component.scss']
})
export class AircraftWeightItemTypeIconComponent implements OnInit {
    @Input() weightItemType: WeightItemType;

    constructor() {
    }


    ngOnInit() {
    }


    protected getWeightItemTypeIcon(type: WeightItemType) {
        switch (type) {
            case WeightItemType.AIRCRAFT:
                return 'fa-solid fa-plane';
            case WeightItemType.FUEL:
                return 'fa-solid fa-droplet';
            case WeightItemType.PERSON:
                return 'fa-solid fa-person';
            case WeightItemType.BAGGAGE:
                return 'fa-solid fa-suitcase';
            case WeightItemType.CUSTOM:
                return 'fa-solid fa-weight-hanging';
        }
        return '';
    }
}
