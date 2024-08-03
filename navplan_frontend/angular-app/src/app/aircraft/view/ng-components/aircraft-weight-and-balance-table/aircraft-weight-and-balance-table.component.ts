import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightItem} from '../../../domain/model/weight-item';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {WeightItemType} from '../../../domain/model/weight-item-type';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';


@Component({
    selector: 'app-aircraft-weight-and-balance-table',
    templateUrl: './aircraft-weight-and-balance-table.component.html',
    styleUrls: ['./aircraft-weight-and-balance-table.component.scss']
})
export class AircraftWeightAndBalanceTableComponent implements OnInit {
    @Input() weightItems: WeightItem[];
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;
    @Output() addWeightItem = new EventEmitter<WeightItem>();
    @Output() deleteWeightItem = new EventEmitter<number>();

    protected readonly ButtonColor = ButtonColor;
    protected displayedColumns: string[] = ['type', 'name', 'arm', 'icons'];


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


    protected getArmText(arm: Length) {
        return arm.getValueAndUnit(this.lengthUnit, 3);
    }


    protected onEditWeightItemClick(weightItem: WeightItem) {
        // TODO
    }


    protected onDeleteWeightItemClick(weightItemIndex: number) {
        this.deleteWeightItem.emit(weightItemIndex);
    }


    protected onAddWeightItemClick() {
        // TODO
    }
}
