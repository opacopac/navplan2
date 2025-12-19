import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-plan-distance-from-route',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    templateUrl: './plan-distance-from-route.component.html',
    styleUrls: ['./plan-distance-from-route.component.scss']
})
export class PlanDistanceFromRouteComponent implements OnInit {
    @Input() public maxDistance: Length;
    @Input() public distanceUnit: LengthUnit;
    @Output() public distanceChanged = new EventEmitter<Length>();

    protected maxDistanceInput: FormControl;


    constructor() {
    }


    ngOnInit(): void {
        const initialValue = this.maxDistance.getValue(this.distanceUnit).toString();
        this.maxDistanceInput = new FormControl(initialValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(150)
        ]);
    }


    protected getDistanceValue(): number {
        return this.maxDistance.getValue(this.distanceUnit);
    }


    protected getDistanceUnit(): string {
        return Length.getUnitString(this.distanceUnit);
    }


    protected onMaxDistanceChanged(maxDistanceStr: string): void {
        if (!maxDistanceStr) {
            return;
        }

        const maxDistanceValue = Number(maxDistanceStr);
        const maxDistance = new Length(maxDistanceValue, this.distanceUnit);
        this.distanceChanged.emit(maxDistance);
    }
}
