import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';


@Component({
    selector: 'app-flightroute-aircraft-speed',
    templateUrl: './flightroute-aircraft-speed.component.html',
    styleUrls: ['./flightroute-aircraft-speed.component.scss']
})
export class FlightrouteAircraftSpeedComponent implements OnInit {
    @Input() public aircraftSpeed: Speed;
    @Input() public speedUnit: SpeedUnit;
    @Output() public aircraftSpeedChanged = new EventEmitter<Speed>();

    protected readonly Speed = Speed;


    constructor() {
    }


    ngOnInit() {
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
