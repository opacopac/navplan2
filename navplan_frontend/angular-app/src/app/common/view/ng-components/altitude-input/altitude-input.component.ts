import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {NavplanUnits} from '../../../../geo-physics/domain/model/navplan-units';


@Component({
    selector: 'app-altitude-input',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
    ],
    templateUrl: './altitude-input.component.html',
    styleUrls: ['./altitude-input.component.scss']
})
export class AltitudeInputComponent implements OnInit, OnChanges {
    @Input() public length: Length | undefined;
    @Input() public defaultLengthUnit!: LengthUnit;
    @Input() public isRequired = false;
    @Input() public minValue = 1;
    @Input() public maxValue = 99999;
    @Output() public lengthChanged = new EventEmitter<Length>();

    protected readonly Length = Length;

    protected get availableUnits(): LengthUnit[] {
        return NavplanUnits.altitudeUnits;
    }

    protected selectedUnit: LengthUnit;
    protected valueControl: FormControl<string>;


    ngOnInit() {
        this.initControl();
    }


    ngOnChanges() {
        this.initControl();
    }


    protected onValueChanged() {
        if (this.valueControl.valid) {
            this.emitLength();
        }
    }


    protected onUnitSelected(unit: LengthUnit) {
        if (unit === this.selectedUnit) {
            return;
        }

        const currentValue = parseFloat(this.valueControl.value);
        if (!isNaN(currentValue) && this.valueControl.valid) {
            const converted = Length.convert(currentValue, this.selectedUnit, unit);
            const rounded = StringnumberHelper.roundToDigits(converted, 0);
            this.valueControl.setValue(rounded != null ? rounded.toString() : '');
        }

        this.selectedUnit = unit;

        if (this.valueControl.valid) {
            this.emitLength();
        }
    }


    private initControl() {
        this.selectedUnit = this.length?.unit ?? this.defaultLengthUnit;
        const initialValue = this.length
            ? StringnumberHelper.roundToDigits(this.length.getValue(this.selectedUnit), 0).toString()
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


    private emitLength() {
        const value = parseFloat(this.valueControl.value);
        if (!isNaN(value)) {
            this.lengthChanged.emit(new Length(value, this.selectedUnit));
        }
    }
}

