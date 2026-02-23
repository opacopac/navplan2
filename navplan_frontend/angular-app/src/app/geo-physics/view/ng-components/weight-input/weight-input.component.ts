import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {Weight} from '../../../domain/model/quantities/weight';
import {WeightUnit} from '../../../domain/model/quantities/weight-unit';
import {NavplanUnits} from '../../../domain/model/navplan-units';
import {AbstractQuantityInputComponent} from '../quantity-input/quantity-input.component';


@Component({
    selector: 'app-weight-input',
    standalone: true,
    templateUrl: '../quantity-input/quantity-input.component.html',
    styleUrls: ['../quantity-input/quantity-input.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
    ],
})
export class WeightInputComponent extends AbstractQuantityInputComponent<Weight, WeightUnit> {
    @Input() public weight: Weight | undefined;
    @Input() public defaultWeightUnit!: WeightUnit;
    @Output() public weightChanged = new EventEmitter<Weight>();


    protected override get quantity(): Weight | undefined {
        return this.weight;
    }


    protected override get defaultUnit(): WeightUnit {
        return this.defaultWeightUnit;
    }


    protected override get availableUnits(): WeightUnit[] {
        return NavplanUnits.weightUnits;
    }


    protected override convertValue(value: number, fromUnit: WeightUnit, toUnit: WeightUnit): number {
        return Weight.convertWeight(value, fromUnit, toUnit);
    }


    protected override getUnitString(unit: WeightUnit): string {
        return Weight.getUnitString(unit);
    }


    protected override createQuantity(value: number, unit: WeightUnit): Weight {
        return new Weight(value, unit);
    }


    protected override emitQuantity(quantity: Weight): void {
        this.weightChanged.emit(quantity);
    }
}

