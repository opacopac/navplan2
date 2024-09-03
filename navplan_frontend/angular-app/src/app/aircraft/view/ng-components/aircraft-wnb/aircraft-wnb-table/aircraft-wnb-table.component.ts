import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from '../../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightItem} from '../../../../domain/model/weight-item';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {WeightItemType} from '../../../../domain/model/weight-item-type';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';
import {MatDialog} from '@angular/material/dialog';
import {VolumeUnit} from '../../../../../geo-physics/domain/model/quantities/volume-unit';
import {
    AircraftWnbEditItemFormDialogComponent
} from '../aircraft-wnb-edit-item-form-dialog/aircraft-wnb-edit-item-form-dialog.component';


@Component({
    selector: 'app-aircraft-wnb-table',
    templateUrl: './aircraft-wnb-table.component.html',
    styleUrls: ['./aircraft-wnb-table.component.scss']
})
export class AircraftWnbTableComponent implements OnInit {
    @Input() weightItems: WeightItem[];
    @Input() weightUnit: WeightUnit;
    @Input() lengthUnit: LengthUnit;
    @Input() volumeUnit: VolumeUnit;
    @Output() addWeightItem = new EventEmitter<WeightItem>();
    @Output() editWeightItem = new EventEmitter<[WeightItem, number]>();
    @Output() deleteWeightItem = new EventEmitter<number>();

    protected readonly ButtonColor = ButtonColor;
    protected displayedColumns: string[] = ['type', 'name', 'arm', 'max', 'default', 'icons'];


    constructor(
        private dialog: MatDialog
    ) {
    }


    ngOnInit() {
    }


    protected getArmText(arm: Length): string {
        return arm.getValueAndUnit(this.lengthUnit, 3);
    }


    protected maxText(entry: WeightItem): string {
        if (entry.maxWeight) {
            return entry.maxWeight.getValueAndUnit(this.weightUnit, 3);
        } else if (entry.maxFuel) {
            return entry.maxFuel.getValueAndUnit(this.volumeUnit, 3);
        } else {
            return '-';
        }
    }


    protected defaultText(entry: WeightItem): string {
        if (entry.defaultWeight) {
            return entry.defaultWeight.getValueAndUnit(this.weightUnit, 3);
        } else if (entry.defaultFuel) {
            return entry.defaultFuel.getValueAndUnit(this.volumeUnit, 3);
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
        const dialogRef = this.dialog.open(AircraftWnbEditItemFormDialogComponent, {
            // height: '800px',
            width: '600px',
            data: {
                weightItem: weightItem,
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