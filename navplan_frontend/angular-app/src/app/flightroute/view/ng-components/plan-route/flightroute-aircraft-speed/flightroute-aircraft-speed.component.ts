import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ButtonColor} from '../../../../../common/view/model/button-color';


@Component({
    selector: 'app-flightroute-aircraft-speed',
    templateUrl: './flightroute-aircraft-speed.component.html',
    styleUrls: ['./flightroute-aircraft-speed.component.scss']
})
export class FlightrouteAircraftSpeedComponent implements OnInit {
    @Input() public routeSpeed: Speed;
    @Input() public speedUnit: SpeedUnit;
    @Input() public selectedAircraftSpeed: Speed;
    @Output() public routeSpeedChanged = new EventEmitter<Speed>();
    @ViewChild('routeSpeed') routeSpeedElement: ElementRef;

    public aircraftSpeedFormGroup: FormGroup;

    protected useAircraftSpeed = false;
    protected readonly ButtonColor = ButtonColor;
    protected readonly Speed = Speed;


    constructor(public parentForm: FormGroupDirective) {
    }


    ngOnInit() {
        if (this.selectedAircraftSpeed) {
            this.useAircraftSpeed = true;
            this.routeSpeed = this.selectedAircraftSpeed;
        }

        this.aircraftSpeedFormGroup = this.parentForm.form;
        this.aircraftSpeedFormGroup.addControl(
            'routeSpeedInput', new FormControl(this.getRouteSpeedValue(), [
                Validators.required,
                Validators.min(1),
                Validators.max(999),
                Validators.pattern('^[0-9]+$')])
        );
    }


    protected getRouteSpeedValue(): number {
        if (this.routeSpeed) {
            return Math.round(this.routeSpeed.getValue(this.speedUnit));
        } else {
            return null;
        }
    }


    protected onUseAircraftSpeedClicked() {
        this.useAircraftSpeed = true;
        this.routeSpeedElement.nativeElement.disabled = true;
        this.routeSpeed = this.selectedAircraftSpeed;
        this.routeSpeedChanged.emit(this.routeSpeed);
    }


    protected onEditSpeedClicked() {
        this.useAircraftSpeed = false;
        this.routeSpeedElement.nativeElement.disabled = false;
        this.routeSpeedElement.nativeElement.focus();
    }


    protected onRouteSpeedChanged(valueString: string) {
        this.useAircraftSpeed = false;
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
