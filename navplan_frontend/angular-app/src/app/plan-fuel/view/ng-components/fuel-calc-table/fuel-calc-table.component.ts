import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteFuel} from '../../../../flightroute/domain/model/routefuel';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Time} from '../../../../geo-physics/domain/model/quantities/time';
import {Volume} from '../../../../geo-physics/domain/model/quantities/volume';
import {VolumeUnit} from '../../../../geo-physics/domain/model/quantities/volume-unit';
import {TimeUnit} from '../../../../geo-physics/domain/model/quantities/time-unit';


interface FuelDataSourceRow {
    type: string;
    title: string;
    time: Time;
    fuel: Volume;
}


@Component({
    selector: 'app-fuel-calc-table',
    templateUrl: './fuel-calc-table.component.html',
    styleUrls: ['./fuel-calc-table.component.scss']
})
export class FuelCalcTableComponent implements OnInit {
    @Input() set routeFuel(value: RouteFuel) {
        this.fuelDataSource = this.calcFuelDataSource(value);
    }

    @Input() fuelUnit: VolumeUnit;
    @Output() extraTimeChanged = new EventEmitter<Time>();

    protected readonly Time = Time;
    protected readonly TimeUnit = TimeUnit;
    protected fuelDataSource: FuelDataSourceRow[] = [];
    protected visibleColumns = ['fuelCalc', 'time', 'fuel'];


    constructor() {
    }


    ngOnInit() {
    }


    protected formatTime(time: Time): string {
        if (time && time.min > 0) {
            const hm = time.getHourMinutes();
            return StringnumberHelper.zeroPad(hm[0], 2) + ':' + StringnumberHelper.zeroPad(hm[1], 2);
        } else {
            return '';
        }
    }


    protected formatFuel(fuel: Volume): string {
        if (fuel) {
            return fuel.getValueAndUnit(this.fuelUnit, 0); // TODO: ceil
        } else {
            return '';
        }
    }


    protected showTimeInput(type: string) {
        return type === 'extra';
    }


    protected getTimeValue(time: Time): number {
        return time ? time.min : 0;
    }

    protected onTimeValueChanged(reserveTimeString: string) {
        let extraTimeMinValue = parseInt(reserveTimeString, 10);
        if (isNaN(extraTimeMinValue) || extraTimeMinValue < 0) {
            extraTimeMinValue = 0;
        }
        const extraTime = new Time(extraTimeMinValue, TimeUnit.M);
        this.extraTimeChanged.emit(extraTime);
    }


    protected calcFuelDataSource(routeFuel: RouteFuel): FuelDataSourceRow[] {
        const fuelDataSource: FuelDataSourceRow[] = [];

        fuelDataSource.push(this.createFuelDataSourceRow(
            'trip',
            'Trip',
            routeFuel ? routeFuel.tripTime : undefined,
            routeFuel ? routeFuel.tripFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
            'alt',
            'Alternate',
            routeFuel ? routeFuel.alternateTime : undefined,
            routeFuel ? routeFuel.alternateFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
            'reserve',
            'Reserve',
            routeFuel ? routeFuel.reserveTime : undefined,
            routeFuel ? routeFuel.reserveFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
            'min',
            'Minimum',
            routeFuel ? routeFuel.minimumTime : undefined,
            routeFuel ? routeFuel.minimumFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
            'extra',
            'Extra fuel',
            routeFuel ? routeFuel.extraTime : undefined,
            routeFuel ? routeFuel.extraFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
            'block',
            'Block fuel',
            routeFuel ? routeFuel.blockTime : undefined,
            routeFuel ? routeFuel.blockFuel : undefined));

        return fuelDataSource;
    }


    private createFuelDataSourceRow(type: string, title: string, time: Time, fuel: Volume): FuelDataSourceRow {
        return {type: type, title: title, time: time, fuel: fuel};
    }
}
