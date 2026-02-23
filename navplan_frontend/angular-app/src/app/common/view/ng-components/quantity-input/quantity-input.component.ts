import {Directive, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AbstractQuantity} from '../../../../geo-physics/domain/model/quantities/abstract-quantity';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


/**
 * Abstract base directive for quantity-input components (altitude, horizontal speed, vertical speed, …).
 * Contains all common logic. Each concrete subclass provides its own @Component decorator with
 * a selector pointing to the shared template/styles in quantity-input.component.{html,scss}.
 */
@Directive()
export abstract class AbstractQuantityInputComponent<Q extends AbstractQuantity<Q, U>, U>
    implements OnInit, OnChanges {

    @Input() public isRequired = false;
    @Input() public minValue = 1;
    @Input() public maxValue = 99999;

    protected selectedUnit: U;
    protected valueControl: FormControl<string>;

    protected abstract get quantity(): Q | undefined;
    protected abstract get defaultUnit(): U;
    protected abstract get availableUnits(): U[];
    protected abstract convertValue(value: number, fromUnit: U, toUnit: U): number;
    protected abstract getUnitString(unit: U): string;
    protected abstract createQuantity(value: number, unit: U): Q;
    protected abstract emitQuantity(quantity: Q): void;


    ngOnInit(): void {
        this.initControl();
    }


    ngOnChanges(): void {
        this.initControl();
    }


    protected onValueChanged(): void {
        if (this.valueControl.valid) {
            this.emitCurrentQuantity();
        }
    }


    protected onUnitSelected(unit: U): void {
        if (unit === this.selectedUnit) {
            return;
        }

        const currentValue = parseFloat(this.valueControl.value);
        if (!isNaN(currentValue) && this.valueControl.valid) {
            const converted = this.convertValue(currentValue, this.selectedUnit, unit);
            const rounded = StringnumberHelper.roundToDigits(converted, 0);
            this.valueControl.setValue(rounded != null ? rounded.toString() : '');
        }

        this.selectedUnit = unit;

        if (this.valueControl.valid) {
            this.emitCurrentQuantity();
        }
    }


    private initControl(): void {
        this.selectedUnit = this.quantity?.unit ?? this.defaultUnit;
        const initialValue = this.quantity
            ? StringnumberHelper.roundToDigits(this.quantity.getValue(this.selectedUnit), 0).toString()
            : '';
        const validators = [
            ...(this.isRequired ? [Validators.required] : []),
            Validators.min(this.minValue),
            Validators.max(this.maxValue)
        ];

        if (this.valueControl) {
            this.valueControl.setValue(initialValue, {emitEvent: false});
            this.valueControl.setValidators(validators);
            this.valueControl.updateValueAndValidity({emitEvent: false});
        } else {
            this.valueControl = new FormControl<string>(initialValue, {
                nonNullable: true,
                validators
            });
        }
    }


    private emitCurrentQuantity(): void {
        const value = parseFloat(this.valueControl.value);
        if (!isNaN(value)) {
            this.emitQuantity(this.createQuantity(value, this.selectedUnit));
        }
    }
}
