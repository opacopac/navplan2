import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {NavplanUnits} from '../../../../geo-physics/domain/model/navplan-units';


@Component({
    selector: 'app-vertical-speed-input',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
    ],
    templateUrl: './vertical-speed-input.component.html',
    styleUrls: ['./vertical-speed-input.component.scss']
})
export class VerticalSpeedInputComponent implements OnInit, OnChanges {
    @Input() public speed: Speed | undefined;
    @Input() public defaultSpeedUnit!: SpeedUnit;
    @Input() public isRequired = false;
    @Input() public minValue = 1;
    @Input() public maxValue = 9999;
    @Output() public speedChanged = new EventEmitter<Speed>();

    protected readonly Speed = Speed;

    protected get availableUnits(): SpeedUnit[] {
        return NavplanUnits.verticalSpeedUnits;
    }

    protected selectedUnit: SpeedUnit;
    protected valueControl: FormControl<string>;


    ngOnInit() {
        this.initControl();
    }


    ngOnChanges() {
        this.initControl();
    }


    protected onValueChanged() {
        if (this.valueControl.valid) {
            this.emitSpeed();
        }
    }


    protected onUnitSelected(unit: SpeedUnit) {
        if (unit === this.selectedUnit) {
            return;
        }

        const currentValue = parseFloat(this.valueControl.value);
        if (!isNaN(currentValue) && this.valueControl.valid) {
            const converted = Speed.convertSpeed(currentValue, this.selectedUnit, unit);
            const rounded = StringnumberHelper.roundToDigits(converted, 0);
            this.valueControl.setValue(rounded != null ? rounded.toString() : '');
        }

        this.selectedUnit = unit;

        if (this.valueControl.valid) {
            this.emitSpeed();
        }
    }


    private initControl() {
        this.selectedUnit = this.speed?.unit ?? this.defaultSpeedUnit;
        const initialValue = this.speed
            ? StringnumberHelper.roundToDigits(this.speed.getValue(this.selectedUnit), 0).toString()
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


    private emitSpeed() {
        const value = parseFloat(this.valueControl.value);
        if (!isNaN(value)) {
            this.speedChanged.emit(new Speed(value, this.selectedUnit));
        }
    }
}



