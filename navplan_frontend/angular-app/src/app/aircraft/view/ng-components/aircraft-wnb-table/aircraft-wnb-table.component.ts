import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightItem} from '../../../domain/model/weight-item';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {WeightItemType} from '../../../domain/model/weight-item-type';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {
    AircraftWnbEditItemDialogComponent
} from '../aircraft-wnb-edit-item-dialog/aircraft-wnb-edit-item-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {VolumeUnit} from '../../../../geo-physics/domain/model/quantities/volume-unit';
import {FormBuilder} from '@angular/forms';


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
    protected displayedColumns: string[] = ['type', 'name', 'arm', 'icons'];


    constructor(
        private dialog: MatDialog,
        public formBuilder: FormBuilder
    ) {
    }


    ngOnInit() {
    }


    protected getWeightItemTypeIcon(type: WeightItemType) {
        switch (type) {
            case WeightItemType.AIRCRAFT:
                return 'fa-solid fa-plane';
            case WeightItemType.FUEL:
                return 'fa-solid fa-droplet';
            case WeightItemType.PERSON:
                return 'fa-solid fa-person';
            case WeightItemType.BAGGAGE:
                return 'fa-solid fa-suitcase';
            case WeightItemType.CUSTOM:
                return 'fa-solid fa-weight-hanging';
        }
        return '';
    }


    protected getArmText(arm: Length) {
        return arm.getValueAndUnit(this.lengthUnit, 3);
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
        const dialogRef = this.dialog.open(AircraftWnbEditItemDialogComponent, {
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
