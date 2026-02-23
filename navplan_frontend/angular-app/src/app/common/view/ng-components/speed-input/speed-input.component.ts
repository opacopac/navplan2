import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


@Component({
    selector: 'app-speed-input',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
    ],
    templateUrl: './speed-input.component.html',
    styleUrls: ['./speed-input.component.scss']
})
export class SpeedInputComponent implements OnInit, OnChanges {
    @Input() public speed: Speed | undefined;
    @Input() public defaultSpeedUnit!: SpeedUnit;
    @Input() public minValue = 1;
    @Input() public maxValue = 9999;
    @Input() public restrictUnits: SpeedUnit[] = [];
    @Output() public speedChanged = new EventEmitter<Speed>();

    protected readonly Speed = Speed;

    protected get availableUnits(): SpeedUnit[] {
        const all = Object.values(SpeedUnit).filter((v): v is SpeedUnit => typeof v === 'number');
        return this.restrictUnits.length > 0 ? all.filter(u => this.restrictUnits.includes(u)) : all;
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

        if (this.valueControl) {
            this.valueControl.setValue(initialValue, {emitEvent: false});
            this.valueControl.setValidators([Validators.required, Validators.min(this.minValue), Validators.max(this.maxValue)]);
            this.valueControl.updateValueAndValidity({emitEvent: false});
        } else {
            this.valueControl = new FormControl<string>(initialValue, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(this.minValue), Validators.max(this.maxValue)]
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






