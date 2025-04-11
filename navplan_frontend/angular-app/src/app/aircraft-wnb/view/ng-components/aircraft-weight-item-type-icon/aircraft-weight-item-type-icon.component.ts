import {Component, Input, OnInit} from '@angular/core';
import {WeightItemType} from '../../../domain/model/weight-item-type';
import {VehicleType} from '../../../../aircraft/domain/model/vehicle-type';


@Component({
    selector: 'app-aircraft-weight-item-type-icon',
    standalone: true,
    imports: [],
    templateUrl: './aircraft-weight-item-type-icon.component.html',
    styleUrls: ['./aircraft-weight-item-type-icon.component.scss']
})
export class AircraftWeightItemTypeIconComponent implements OnInit {
    @Input() weightItemType: WeightItemType;
    @Input() vehicleType: VehicleType;

    constructor() {
    }


    ngOnInit() {
    }


    protected getWeightItemTypeIcon(type: WeightItemType) {
        switch (type) {
            case WeightItemType.AIRCRAFT:
                return this.vehicleType === VehicleType.HELICOPTER ? 'fa-solid fa-helicopter' : 'fa-solid fa-plane';
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
