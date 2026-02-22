import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-flightroute-cruising-altitude',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './flightroute-cruising-altitude.component.html',
    styleUrls: ['./flightroute-cruising-altitude.component.scss']
})
export class FlightrouteCruisingAltitudeComponent implements OnInit {
    @Input() public cruiseAltitude: Length;
    @Input() public altitudeUnit: LengthUnit;
    @Output() public cruiseAltitudeChanged = new EventEmitter<Length>();

    public cruiseAltFormGroup: FormGroup;

    protected readonly Length = Length;


    constructor(public parentForm: FormGroupDirective) {
    }


    ngOnInit() {
        this.cruiseAltFormGroup = this.parentForm.form;
        this.cruiseAltFormGroup.addControl(
            'cruiseAltInput',
            new FormControl(
                this.getCruiseAltValue(),
                [
                    Validators.min(0),
                    Validators.max(99999),
                    Validators.pattern('^[0-9]*$')
                ]
            )
        );
    }


    protected getCruiseAltValue(): number | null {
        if (this.cruiseAltitude) {
            return this.cruiseAltitude.getValue(this.altitudeUnit);
        }
        return null;
    }


    protected onCruiseAltChanged(valueString: string) {
        if (valueString === null || valueString === '') {
            this.cruiseAltitudeChanged.emit(undefined);
            return;
        }

        const value = parseFloat(valueString);
        if (!isNaN(value) && value >= 0) {
            this.cruiseAltitudeChanged.emit(new Length(value, this.altitudeUnit));
        }
    }
}
