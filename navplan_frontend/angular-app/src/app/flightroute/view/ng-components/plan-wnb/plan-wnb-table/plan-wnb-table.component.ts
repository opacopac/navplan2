import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from '../../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';
import {VolumeUnit} from '../../../../../geo-physics/domain/model/quantities/volume-unit';
import {FormBuilder} from '@angular/forms';
import {WeightItem} from '../../../../../aircraft/domain/model/weight-item';
import {Weight} from '../../../../../geo-physics/domain/model/quantities/weight';
import {StringnumberHelper} from '../../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Volume} from '../../../../../geo-physics/domain/model/quantities/volume';
import {WeightItemType} from '../../../../../aircraft/domain/model/weight-item-type';
import {PlanWnbService} from '../../../../domain/service/plan-wnb.service';
import {VehicleType} from '../../../../../aircraft/domain/model/vehicle-type';


@Component({
    selector: 'app-plan-wnb-table',
    templateUrl: './plan-wnb-table.component.html',
    styleUrls: ['./plan-wnb-table.component.scss']
})
export class PlanWnbTableComponent implements OnInit {
    @Input() weightItems: WeightItem[];
    @Input() vehicleType: VehicleType;
    @Input() routeFuel: Volume;
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;
    @Input() volumeUnit: VolumeUnit;
    @Output() weightItemChanged = new EventEmitter<[WeightItem, Weight, Volume]>();

    protected readonly Weight = Weight;
    protected readonly Volume = Volume;
    protected readonly ButtonColor = ButtonColor;
    protected readonly PlanWnbService = PlanWnbService;
    protected displayedColumns: string[] = ['type', 'name', 'weight', 'armLong', 'armLat', 'momentLong', 'momentLat'];


    constructor(
        public formBuilder: FormBuilder
    ) {
    }


    ngOnInit() {
    }


    protected showWeightText(type: WeightItemType): boolean {
        return PlanWnbService.isSummaryTypeItem(type) || type === WeightItemType.AIRCRAFT;
    }


    protected showWeightInput(type: WeightItemType): boolean {
        return PlanWnbService.isWeightTypeItem(type) && type !== WeightItemType.AIRCRAFT;
    }


    protected showFuelInput(type: WeightItemType): boolean {
        return PlanWnbService.isFuelTypeItem(type);
    }


    protected getWeightText(weight: Weight) {
        if (!weight) {
            return '';
        }

        return weight.getValueAndUnit(this.weightUnit, 0);
    }


    protected getWeightValue(weight: Weight): number {
        if (!weight) {
            return 0;
        }

        return Math.round(weight.getValue(this.weightUnit));
    }


    protected getFuelValue(fuel: Volume): number {
        if (!fuel) {
            return 0;
        }

        return Math.round(fuel.getValue(this.volumeUnit));
    }


    protected getArmText(arm: Length): string {
        if (!arm) {
            return '';
        }

        return arm.getValueAndUnit(this.lengthUnit, 3);
    }


    protected getMomentLongText(weightItem: WeightItem): string {
        if (!weightItem || !weightItem.weight || !weightItem.armLong) {
            return '';
        }

        const moment = weightItem.weight.getValue(this.weightUnit) * weightItem.armLong.getValue(this.lengthUnit);
        const momentUnit = Weight.getUnitString(this.weightUnit) + ' ' + Length.getUnitString(this.lengthUnit);

        return StringnumberHelper.roundToDigits(moment, 0) + ' ' + momentUnit;
    }


    protected getMomentLatText(weightItem: WeightItem): string {
        if (!weightItem || !weightItem.weight || !weightItem.armLat) {
            return '';
        }

        const moment = weightItem.weight.getValue(this.weightUnit) * weightItem.armLat.getValue(this.lengthUnit);
        const momentUnit = Weight.getUnitString(this.weightUnit) + ' ' + Length.getUnitString(this.lengthUnit);

        return StringnumberHelper.roundToDigits(moment, 0) + ' ' + momentUnit;
    }


    protected onWeightItemWeightChanged(weightItem: WeightItem, weightString: string) {
        const weightValue = parseInt(weightString, 10);
        const newWeight = new Weight(weightValue, this.weightUnit);
        this.weightItemChanged.emit([weightItem, newWeight, null]);
    }


    protected onWeightItemFuelChanged(weightItem: WeightItem, fuelString: string) {
        const fuelValue = parseInt(fuelString, 10);
        const newFuel = new Volume(fuelValue, this.volumeUnit);
        this.weightItemChanged.emit([weightItem, null, newFuel]);
    }
}
