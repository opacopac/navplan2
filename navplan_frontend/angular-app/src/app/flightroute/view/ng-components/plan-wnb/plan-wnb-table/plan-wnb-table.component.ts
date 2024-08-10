import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from '../../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';
import {MatDialog} from '@angular/material/dialog';
import {VolumeUnit} from '../../../../../geo-physics/domain/model/quantities/volume-unit';
import {FormBuilder} from '@angular/forms';
import {WeightItem} from '../../../../../aircraft/domain/model/weight-item';
import {Weight} from '../../../../../geo-physics/domain/model/quantities/weight';
import {StringnumberHelper} from '../../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Volume} from '../../../../../geo-physics/domain/model/quantities/volume';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';


@Component({
    selector: 'app-plan-wnb-table',
    templateUrl: './plan-wnb-table.component.html',
    styleUrls: ['./plan-wnb-table.component.scss']
})
export class PlanWnbTableComponent implements OnInit {
    @Input() weightItems: WeightItem[];
    @Input() routeFuel: Volume;
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;
    @Input() volumeUnit: VolumeUnit;
    @Output() weightItemChanged = new EventEmitter<[WeightItem, Weight, Volume]>();

    protected readonly Weight = Weight;
    protected readonly Consumption = Consumption;
    protected readonly ButtonColor = ButtonColor;
    protected displayedColumns: string[] = ['type', 'name', 'weight', 'arm', 'moment'];


    constructor(
        private dialog: MatDialog,
        public formBuilder: FormBuilder
    ) {
    }


    ngOnInit() {
    }


    protected getWeightValue(weight: Weight): number {
        if (!weight) {
            return 0;
        }

        return Math.round(weight.getValue(this.weightUnit));
    }


    protected getArmText(arm: Length): string {
        if (!arm) {
            return '';
        }

        return arm.getValueAndUnit(this.lengthUnit, 3);
    }


    protected getMomentText(weightItem: WeightItem): string {
        if (!weightItem || !weightItem.weight || !weightItem.arm) {
            return '';
        }

        const moment = weightItem.weight.getValue(this.weightUnit) * weightItem.arm.getValue(this.lengthUnit);
        const momentUnit = Weight.getUnitString(this.weightUnit) + ' ' + Length.getUnitString(this.lengthUnit);

        return StringnumberHelper.roundToDigits(moment, 3) + ' ' + momentUnit;
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
