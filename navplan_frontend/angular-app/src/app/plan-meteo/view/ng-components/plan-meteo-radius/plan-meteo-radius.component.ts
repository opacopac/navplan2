import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-plan-meteo-radius',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    templateUrl: './plan-meteo-radius.component.html',
    styleUrls: ['./plan-meteo-radius.component.scss']
})
export class PlanMeteoRadiusComponent implements OnInit {
    @Input() public routeMaxMeteoRadius: Length;
    @Input() public distanceUnit: LengthUnit;
    @Output() public radiusChanged = new EventEmitter<Length>();

    protected maxRadiusInput: FormControl;


    constructor() {
    }


    ngOnInit(): void {
        const initialValue = this.routeMaxMeteoRadius.getValue(this.distanceUnit).toString();
        this.maxRadiusInput = new FormControl(initialValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(150)
        ]);
    }


    protected getRadiusValue(): number {
        return this.routeMaxMeteoRadius.getValue(this.distanceUnit);
    }


    protected getRadiusUnit(): string {
        return Length.getUnitString(this.distanceUnit);
    }


    protected onMaxRadiusChanged(valueString: string) {
        const value = parseInt(valueString, 10);
        const radius = new Length(value, this.distanceUnit);
        this.radiusChanged.emit(radius);
    }
}
