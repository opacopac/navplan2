import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteFuel} from '../../model/routefuel';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Time} from '../../../shared/model/quantities/time';
import {TimeUnit, VolumeUnit} from '../../../shared/model/units';
import {Fuel} from '../../../shared/model/quantities/fuel';


interface FuelDataSourceRow {
    title: string;
    time: Time;
    fuel: Fuel;
    isExtra: boolean;
    isBlock: boolean;
}


@Component({
    selector: 'app-fuel-calculation',
    templateUrl: './fuel-calculation.component.html',
    styleUrls: ['./fuel-calculation.component.css']
})
export class FuelCalculationComponent implements OnInit {
    @Output() onInputExtraTime = new EventEmitter<string>();
    public _routeFuel: RouteFuel;
    public extraTimeForm: FormGroup;
    public fuelDataSource: FuelDataSourceRow[] = [];


    constructor(private formBuilder: FormBuilder) {
        this.initForm();
    }


    @Input()
    set routeFuel(value: RouteFuel) {
        this._routeFuel = value;
        this.fuelDataSource = this.creatFuelDataSource(value);
        if (value) {
            this.setFormValues(value.extraTime);
        } else {
            this.setFormValues(undefined);
        }
    }


    ngOnInit() {
    }


    private initForm() {
        this.extraTimeForm = this.formBuilder.group({
            'extraTime': [undefined, [Validators.required, Validators.maxLength(3)]]
        });
    }


    private setFormValues(extraTime: Time) {
        this.extraTimeForm.setValue({ extraTime: extraTime ? extraTime.getValue(TimeUnit.M) : '' }); // TODO
    }


    private creatFuelDataSource(routeFuel: RouteFuel): FuelDataSourceRow[] {
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
                routeFuel ? routeFuel.extraFuel : undefined,
            true, false));
        fuelDataSource.push(this.createFuelDataSourceRow(
                'Block fuel',
                routeFuel ? routeFuel.blockTime : undefined,
                routeFuel ? routeFuel.blockFuel : undefined,
            false, true));

        return fuelDataSource;
    }


    private createFuelDataSourceRow(title: string, time: Time, fuel: Fuel, isExtra = false, isBlock = false): FuelDataSourceRow {
        return { title: title, time: time, fuel: fuel, isExtra: isExtra, isBlock: isBlock };
    }


    public isExtraFuelRow(index: number, rowData: FuelDataSourceRow): boolean {
        return rowData.isExtra;
    }


    public isBlockFuelRow(index: number, rowData: FuelDataSourceRow): boolean {
        return rowData.isBlock;
    }


    public formatTime(time: Time): string {
        if (time && time.min > 0) {
            const hm = time.getHourMinutes();
            return StringnumberService.zeroPad(hm[0], 2) + ':' + StringnumberService.zeroPad(hm[1], 2);
        } else {
            return '';
        }
    }


    public formatFuel(fuel: Fuel): string {
        if (fuel) {
            return '' + Math.ceil(fuel.getValue(VolumeUnit.L)); // TODO
        } else {
            return '';
        }
    }
}
