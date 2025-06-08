import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightItem} from '../../../domain/model/weight-item';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {WeightItemType} from '../../../domain/model/weight-item-type';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {MatDialog} from '@angular/material/dialog';
import {VolumeUnit} from '../../../../geo-physics/domain/model/quantities/volume-unit';
import {
    AircraftWnbEditWeightItemFormDialogComponent
} from '../aircraft-wnb-edit-weight-item-form-dialog/aircraft-wnb-edit-weight-item-form-dialog.component';
import {VehicleType} from '../../../../aircraft/domain/model/vehicle-type';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {
    AircraftWeightItemTypeIconComponent
} from '../aircraft-weight-item-type-icon/aircraft-weight-item-type-icon.component';
import {IconButtonComponent} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-aircraft-wnb-weight-item-table',
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        IconButtonComponent,
        AircraftWeightItemTypeIconComponent,
    ],
    templateUrl: './aircraft-wnb-weight-item-table.component.html',
    styleUrls: ['./aircraft-wnb-weight-item-table.component.scss']
})
export class AircraftWnbWeightItemTableComponent implements OnInit {
    @Input() vehicleType: VehicleType;
    @Input() weightItems: WeightItem[];
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;
    @Input() volumeUnit: VolumeUnit;
    @Output() addWeightItem = new EventEmitter<WeightItem>();
    @Output() editWeightItem = new EventEmitter<[WeightItem, number]>();
    @Output() deleteWeightItem = new EventEmitter<number>();

    protected readonly ButtonColor = ButtonColor;

    private aircraftColumns: string[] = ['type', 'name', 'armLong', 'maxWeight', 'defaultWeight', 'icons'];
    private heliColumns: string[] = ['type', 'name', 'armLong', 'armLat', 'maxWeight', 'defaultWeight', 'icons'];


    constructor(
        private dialog: MatDialog
    ) {
    }


    ngOnInit() {
    }


    protected getDisplayColumns(): string[] {
        return this.vehicleType === VehicleType.HELICOPTER ? this.heliColumns : this.aircraftColumns;
    }


    protected getArmLongTitle(): string {
        return this.vehicleType === VehicleType.HELICOPTER ? 'Arm (long.)' : 'Arm';
    }


    protected getArmText(arm: Length): string {
        return arm.getValueAndUnit(this.lengthUnit, 3);
    }


    protected maxWeightText(entry: WeightItem): string {
        if (entry.maxWeight) {
            return entry.maxWeight.getValueAndUnit(this.weightUnit, 0);
        } else if (entry.maxFuel) {
            return entry.maxFuel.getValueAndUnit(this.volumeUnit, 0);
        } else {
            return '-';
        }
    }


    protected defaultWeightText(entry: WeightItem): string {
        if (entry.defaultWeight) {
            return entry.defaultWeight.getValueAndUnit(this.weightUnit, 0);
        } else if (entry.defaultFuel) {
            return entry.defaultFuel.getValueAndUnit(this.volumeUnit, 0);
        } else {
            return '-';
        }
    }


    protected onEditWeightItemClick(weightItem: WeightItem) {
        this.openDialog(weightItem);
    }


    protected onDeleteWeightItemClick(weightItemIndex: number) {
        this.deleteWeightItem.emit(weightItemIndex);
    }


    protected onAddWeightItemClick() {
        this.openDialog(null);
    }


    private openDialog(weightItem: WeightItem) {
        const dialogRef = this.dialog.open(AircraftWnbEditWeightItemFormDialogComponent, {
            // height: '800px',
            width: '600px',
            data: {
                weightItem: weightItem,
                vehicleType: this.vehicleType,
                allowAircraftType: !this.hasAircraftTypeItem(),
                wnbLengthUnit: this.lengthUnit,
                weightUnit: this.weightUnit,
                volumeUnit: this.volumeUnit,
            }
        });

        dialogRef.afterClosed().subscribe((newWeightItem) => {
            if (newWeightItem) {
                if (weightItem) {
                    this.editWeightItem.emit([newWeightItem, this.weightItems.indexOf(weightItem)]);
                } else {
                    this.addWeightItem.emit(newWeightItem);
                }
            }
        });
    }


    private hasAircraftTypeItem(): boolean {
        return this.weightItems.some(item => item.type === WeightItemType.AIRCRAFT);
    }
}
