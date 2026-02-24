import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {Consumption} from '../../../domain/model/quantities/consumption';
import {ConsumptionUnit} from '../../../domain/model/quantities/consumption-unit';
import {NavplanUnits} from '../../../domain/model/navplan-units';
import {AbstractQuantityInputComponent} from '../quantity-input/quantity-input.component';


@Component({
    selector: 'app-consumption-input',
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
export class ConsumptionInputComponent extends AbstractQuantityInputComponent<Consumption, ConsumptionUnit> {
    @Input() public consumption: Consumption | undefined;
    @Input() public defaultConsumptionUnit!: ConsumptionUnit;
    @Input() public override isDisabled = false;
    @Output() public consumptionChanged = new EventEmitter<Consumption>();

    protected override get quantity(): Consumption | undefined {
        return this.consumption;
    }

    protected override get defaultUnit(): ConsumptionUnit {
        return this.defaultConsumptionUnit;
    }

    protected override get availableUnits(): ConsumptionUnit[] {
        return NavplanUnits.consumptionUnits;
    }

    protected override convertValue(value: number, fromUnit: ConsumptionUnit, toUnit: ConsumptionUnit): number {
        return Consumption.convertConsumption(value, fromUnit, toUnit);
    }

    protected override getUnitString(unit: ConsumptionUnit): string {
        return Consumption.getUnitString(unit);
    }

    protected override createQuantity(value: number, unit: ConsumptionUnit): Consumption {
        return new Consumption(value, unit);
    }

    protected override emitQuantity(quantity: Consumption): void {
        this.consumptionChanged.emit(quantity);
    }
}

