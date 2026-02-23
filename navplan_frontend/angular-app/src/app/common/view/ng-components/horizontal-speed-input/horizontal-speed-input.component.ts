import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {NavplanUnits} from '../../../../geo-physics/domain/model/navplan-units';
import {AbstractQuantityInputComponent} from '../quantity-input/quantity-input.component';


@Component({
    selector: 'app-horizontal-speed-input',
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
export class HorizontalSpeedInputComponent extends AbstractQuantityInputComponent<Speed, SpeedUnit> {
    @Input() public speed: Speed | undefined;
    @Input() public defaultSpeedUnit!: SpeedUnit;
    @Output() public speedChanged = new EventEmitter<Speed>();


    protected override get quantity(): Speed | undefined {
        return this.speed;
    }


    protected override get defaultUnit(): SpeedUnit {
        return this.defaultSpeedUnit;
    }


    protected override get availableUnits(): SpeedUnit[] {
        return NavplanUnits.horizontalSpeedUnits;
    }


    protected override convertValue(value: number, fromUnit: SpeedUnit, toUnit: SpeedUnit): number {
        return Speed.convertSpeed(value, fromUnit, toUnit);
    }


    protected override getUnitString(unit: SpeedUnit): string {
        return Speed.getUnitString(unit);
    }


    protected override createQuantity(value: number, unit: SpeedUnit): Speed {
        return new Speed(value, unit);
    }


    protected override emitQuantity(quantity: Speed): void {
        this.speedChanged.emit(quantity);
    }
}



