import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {Volume} from '../../../domain/model/quantities/volume';
import {VolumeUnit} from '../../../domain/model/quantities/volume-unit';
import {NavplanUnits} from '../../../domain/model/navplan-units';
import {AbstractQuantityInputComponent} from '../quantity-input/quantity-input.component';


@Component({
    selector: 'app-fuel-input',
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
export class FuelInputComponent extends AbstractQuantityInputComponent<Volume, VolumeUnit> {
    @Input() public volume: Volume | undefined;
    @Input() public defaultVolumeUnit!: VolumeUnit;


    protected override get quantity(): Volume | undefined {
        return this.volume;
    }


    protected override get defaultUnit(): VolumeUnit {
        return this.defaultVolumeUnit;
    }


    protected override get availableUnits(): VolumeUnit[] {
        return NavplanUnits.fuelUnits;
    }


    protected override convertValue(value: number, fromUnit: VolumeUnit, toUnit: VolumeUnit): number {
        return Volume.convertVolume(value, fromUnit, toUnit);
    }


    protected override getUnitString(unit: VolumeUnit): string {
        return Volume.getUnitString(unit);
    }


    protected override createQuantity(value: number, unit: VolumeUnit): Volume {
        return new Volume(value, unit);
    }
}
