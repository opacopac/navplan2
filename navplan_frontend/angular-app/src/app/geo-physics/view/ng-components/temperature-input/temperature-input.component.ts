import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {Temperature} from '../../../domain/model/quantities/temperature';
import {TemperatureUnit} from '../../../domain/model/quantities/temperature-unit';
import {NavplanUnits} from '../../../domain/model/navplan-units';
import {AbstractQuantityInputComponent} from '../quantity-input/quantity-input.component';


@Component({
    selector: 'app-temperature-input',
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
export class TemperatureInputComponent extends AbstractQuantityInputComponent<Temperature, TemperatureUnit> {
    @Input() public temperature: Temperature | undefined;
    @Input() public defaultTemperatureUnit!: TemperatureUnit;


    protected override get quantity(): Temperature | undefined {
        return this.temperature;
    }


    protected override get defaultUnit(): TemperatureUnit {
        return this.defaultTemperatureUnit;
    }


    protected override get availableUnits(): TemperatureUnit[] {
        return NavplanUnits.temperatureUnits;
    }


    protected override convertValue(value: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number {
        return Temperature.convertTemperature(value, fromUnit, toUnit);
    }


    protected override getUnitString(unit: TemperatureUnit): string {
        return Temperature.getUnitString(unit);
    }


    protected override createQuantity(value: number, unit: TemperatureUnit): Temperature {
        return new Temperature(value, unit);
    }
}
