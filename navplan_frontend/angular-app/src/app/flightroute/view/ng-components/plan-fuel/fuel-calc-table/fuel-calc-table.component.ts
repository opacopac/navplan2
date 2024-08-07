import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {RouteFuel} from '../../../../domain/model/routefuel';
import {StringnumberHelper} from '../../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Time} from '../../../../../geo-physics/domain/model/quantities/time';
import {Volume} from '../../../../../geo-physics/domain/model/quantities/volume';
import {VolumeUnit} from '../../../../../geo-physics/domain/model/quantities/volume-unit';


interface FuelDataSourceRow {
    title: string;
    time: Time;
    fuel: Volume;
    isBlock: boolean;
}


@Component({
    selector: 'app-fuel-calc-table',
    templateUrl: './fuel-calc-table.component.html',
    styleUrls: ['./fuel-calc-table.component.scss']
})
export class FuelCalcTableComponent implements OnInit, OnChanges {
    @Input() set routeFuel(value: RouteFuel) {
        this.fuelDataSource = this.calcFuelDataSource(value);
    }

    @Input() fuelUnit: VolumeUnit;
    protected fuelDataSource: FuelDataSourceRow[] = [];
    protected visibleColumns = ['fuelCalc', 'time', 'fuel'];


    constructor() {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        // this.fuelDataSource = this.calcFuelDataSource(this.routeFuel);
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
            return '' + Math.ceil(fuel.getValue(this.fuelUnit));
        } else {
            return '';
        }
    }


    protected calcFuelDataSource(routeFuel: RouteFuel): FuelDataSourceRow[] {
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
        return {title: title, time: time, fuel: fuel, isBlock: isBlock};
    }
}
