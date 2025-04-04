import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ButtonColor} from '../../../../common/view/model/button-color';


@Component({
    selector: 'app-flightroute-aircraft-speed',
    templateUrl: './flightroute-aircraft-speed.component.html',
    styleUrls: ['./flightroute-aircraft-speed.component.scss']
})
export class FlightrouteAircraftSpeedComponent implements OnInit, OnChanges {
    @Input() public routeSpeed: Speed;
    @Input() public speedUnit: SpeedUnit;
    @Input() public useAircraftValue: boolean;
    @Output() public routeSpeedChanged = new EventEmitter<Speed>();

    public aircraftSpeedFormGroup: FormGroup;

    protected readonly ButtonColor = ButtonColor;
    protected readonly Speed = Speed;


    constructor(public parentForm: FormGroupDirective) {
    }


    ngOnInit() {
        this.aircraftSpeedFormGroup = this.parentForm.form;
        this.aircraftSpeedFormGroup.addControl(
            'routeSpeedInput',
            new FormControl(
                {value: this.getRouteSpeedValue(), disabled: this.useAircraftValue},
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(999),
                    Validators.pattern('^[0-9]+$')
                ]
            )
        );
    }


    ngOnChanges() {
        if (this.useAircraftValue) {
            this.aircraftSpeedFormGroup?.get('routeSpeedInput')?.disable();
        } else {
            this.aircraftSpeedFormGroup?.get('routeSpeedInput')?.enable();
        }
    }


    protected getRouteSpeedValue(): number {
        if (this.routeSpeed) {
            return Math.round(this.routeSpeed.getValue(this.speedUnit));
        } else {
            return null;
        }
    }


    protected onRouteSpeedChanged(valueString: string) {
        if (this.isValidRouteSpeed(valueString)) {
            const valueInt = parseInt(valueString, 10);
            const speed = new Speed(valueInt, this.speedUnit);
            this.routeSpeedChanged.emit(speed);
        }
    }


    protected isValidRouteSpeed(valueString: string): boolean {
        const valueInt = parseInt(valueString, 10);
        return !(isNaN(valueInt) || valueInt <= 0);
    }
}
