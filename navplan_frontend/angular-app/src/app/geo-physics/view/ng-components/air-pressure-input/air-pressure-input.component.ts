import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {Pressure} from '../../../domain/model/quantities/pressure';
import {PressureUnit} from '../../../domain/model/quantities/pressure-unit';
import {NavplanUnits} from '../../../domain/model/navplan-units';
import {AbstractQuantityInputComponent} from '../quantity-input/quantity-input.component';


@Component({
    selector: 'app-air-pressure-input',
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
export class AirPressureInputComponent extends AbstractQuantityInputComponent<Pressure, PressureUnit> {
    @Input() public pressure: Pressure | undefined;
    @Input() public defaultPressureUnit!: PressureUnit;
    @Output() public pressureChanged = new EventEmitter<Pressure>();


    protected override get quantity(): Pressure | undefined {
        return this.pressure;
    }


    protected override get defaultUnit(): PressureUnit {
        return this.defaultPressureUnit;
    }


    protected override get availableUnits(): PressureUnit[] {
        return NavplanUnits.pressureUnits;
    }


    protected override convertValue(value: number, fromUnit: PressureUnit, toUnit: PressureUnit): number {
        return Pressure.convertTemperature(value, fromUnit, toUnit);
    }


    protected override getUnitString(unit: PressureUnit): string {
        return Pressure.getUnitString(unit);
    }


    protected override createQuantity(value: number, unit: PressureUnit): Pressure {
        return new Pressure(value, unit);
    }


    protected override emitQuantity(quantity: Pressure): void {
        this.pressureChanged.emit(quantity);
    }
}

