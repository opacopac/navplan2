import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';


@Component({
    selector: 'app-flightroute-aircraft-speed',
    templateUrl: './flightroute-aircraft-speed.component.html',
    styleUrls: ['./flightroute-aircraft-speed.component.scss']
})
export class FlightrouteAircraftSpeedComponent implements OnInit {
    @Input() public aircraftSpeed: Speed;
    @Input() public speedUnit: SpeedUnit;
    @Output() public aircraftSpeedChanged = new EventEmitter<Speed>();

    public aircraftSpeedFormGroup: FormGroup;

    protected readonly Speed = Speed;


    constructor(public parentForm: FormGroupDirective) {
    }


    ngOnInit() {
        this.aircraftSpeedFormGroup = this.parentForm.form;
        this.aircraftSpeedFormGroup.addControl(
            'aircraftSpeedInput', new FormControl(null, [Validators.required,
                Validators.min(1), Validators.pattern('^[0-9]+$')])
        );
    }


    protected getAircraftSpeedValue(): number {
        return Math.round(this.aircraftSpeed.getValue(this.speedUnit));
    }


    protected onAircraftSpeedChanged(valueString: string) {
        if (this.isValidAircraftSpeed(valueString)) {
            const valueInt = parseInt(valueString, 10);
            const speed = new Speed(valueInt, this.speedUnit);
            this.aircraftSpeedChanged.emit(speed);
        }
    }


    protected isValidAircraftSpeed(valueString: string): boolean {
        const valueInt = parseInt(valueString, 10);
        return !(isNaN(valueInt) || valueInt <= 0);
    }
}
