import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {RouteFuel} from '../../model/routefuel';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {Time} from '../../../shared/model/quantities/time';
import {VolumeUnit} from '../../../shared/model/quantities/units';
import {Volume} from '../../../shared/model/quantities/volume';


interface FuelDataSourceRow {
    title: string;
    time: Time;
    fuel: Volume;
    isBlock: boolean;
}


@Component({
    selector: 'app-fuel-calc-table',
    templateUrl: './fuel-calc-table.component.html',
    styleUrls: ['./fuel-calc-table.component.css']
})
export class FuelCalcTableComponent implements OnInit, OnChanges {
    @Input() routeFuel: RouteFuel;
    public fuelDataSource: FuelDataSourceRow[] = [];
    public Number = Number;


    constructor() {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.fuelDataSource = this.createFuelDataSource(this.routeFuel);
    }


    private createFuelDataSource(routeFuel: RouteFuel): FuelDataSourceRow[] {
        const fuelDataSource: FuelDataSourceRow[] = [];

        fuelDataSource.push(this.createFuelDataSourceRow(
                'Trip',
                routeFuel ? routeFuel.tripTime : undefined,
                routeFuel ? routeFuel.tripFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
                'Alternate',
                routeFuel ? routeFuel.alternateTime : undefined,
                routeFuel ? routeFuel.alternateFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
                'Reserve',
                routeFuel ? routeFuel.reserveTime : undefined,
                routeFuel ? routeFuel.reserveFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
                'Minimum',
                routeFuel ? routeFuel.minimumTime : undefined,
                routeFuel ? routeFuel.minimumFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
                'Extra fuel',
                routeFuel ? routeFuel.extraTime : undefined,
                routeFuel ? routeFuel.extraFuel : undefined));
        fuelDataSource.push(this.createFuelDataSourceRow(
                'Block fuel',
                routeFuel ? routeFuel.blockTime : undefined,
                routeFuel ? routeFuel.blockFuel : undefined,
            true));

        return fuelDataSource;
    }


    private createFuelDataSourceRow(title: string, time: Time, fuel: Volume, isBlock = false): FuelDataSourceRow {
        return { title: title, time: time, fuel: fuel, isBlock: isBlock };
    }


    public formatTime(time: Time): string {
        if (time && time.min > 0) {
            const hm = time.getHourMinutes();
            return StringnumberService.zeroPad(hm[0], 2) + ':' + StringnumberService.zeroPad(hm[1], 2);
        } else {
            return '';
        }
    }


    public formatFuel(fuel: Volume): string {
        if (fuel) {
            return '' + Math.ceil(fuel.getValue(VolumeUnit.L)); // TODO
        } else {
            return '';
        }
    }
}
