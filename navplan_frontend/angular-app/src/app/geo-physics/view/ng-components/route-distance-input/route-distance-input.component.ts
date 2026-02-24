import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {Length} from '../../../domain/model/quantities/length';
import {LengthUnit} from '../../../domain/model/quantities/length-unit';
import {NavplanUnits} from '../../../domain/model/navplan-units';
import {AbstractQuantityInputComponent} from '../quantity-input/quantity-input.component';


@Component({
    selector: 'app-route-distance-input',
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
export class RouteDistanceInputComponent extends AbstractQuantityInputComponent<Length, LengthUnit> {
    @Input() public length: Length | undefined;
    @Input() public defaultLengthUnit!: LengthUnit;


    protected override get quantity(): Length | undefined {
        return this.length;
    }


    protected override get defaultUnit(): LengthUnit {
        return this.defaultLengthUnit;
    }


    protected override get availableUnits(): LengthUnit[] {
        return NavplanUnits.routeDistanceUnits;
    }


    protected override convertValue(value: number, fromUnit: LengthUnit, toUnit: LengthUnit): number {
        return Length.convert(value, fromUnit, toUnit);
    }


    protected override getUnitString(unit: LengthUnit): string {
        return Length.getUnitString(unit);
    }


    protected override createQuantity(value: number, unit: LengthUnit): Length {
        return new Length(value, unit);
    }
}
