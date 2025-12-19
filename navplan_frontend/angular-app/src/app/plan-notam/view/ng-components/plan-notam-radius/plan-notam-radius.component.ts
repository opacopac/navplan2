import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-plan-notam-radius',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    templateUrl: './plan-notam-radius.component.html',
    styleUrls: ['./plan-notam-radius.component.scss']
})
export class PlanNotamRadiusComponent implements OnInit {
    @Input() public routeMaxNotamRadius: Length;
    @Input() public distanceUnit: LengthUnit;
    @Output() public radiusChanged = new EventEmitter<Length>();

    protected maxRadiusInput: FormControl;


    constructor() {
    }


    ngOnInit(): void {
        const initialValue = this.routeMaxNotamRadius.getValue(this.distanceUnit).toString();
        this.maxRadiusInput = new FormControl(initialValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(150)
        ]);
    }


    protected getRadiusValue(): number {
        return this.routeMaxNotamRadius.getValue(this.distanceUnit);
    }


    protected getRadiusUnit(): string {
        return Length.getUnitString(this.distanceUnit);
    }


    protected onMaxRadiusChanged(maxRadiusStr: string): void {
        if (!maxRadiusStr) {
            return;
        }

        const maxRadiusValue = Number(maxRadiusStr);
        const maxRadius = new Length(maxRadiusValue, this.distanceUnit);
        this.radiusChanged.emit(maxRadius);
    }
}
