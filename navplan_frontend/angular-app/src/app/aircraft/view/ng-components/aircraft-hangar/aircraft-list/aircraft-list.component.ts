import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {AircraftListEntry} from '../../../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../../../domain/model/aircraft';
import {MatDialog} from '@angular/material/dialog';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {AircraftCreateFormDialogComponent} from '../aircraft-create-form-dialog/aircraft-create-form-dialog.component';


export interface ListEntry {
    id: number;
    vehicleType: string;
    registration: string;
    icaoType: string;
}


@Component({
    selector: 'app-aircraft-list',
    templateUrl: './aircraft-list.component.html',
    styleUrls: ['./aircraft-list.component.scss']
})
export class AircraftListComponent implements OnInit, OnChanges {
    @Input() aircraftList: AircraftListEntry[];
    @Input() currentAircraft: Aircraft;
    @Input() speedUnit: SpeedUnit;
    @Input() consumptionUnit: ConsumptionUnit;
    @Output() aircraftAdded = new EventEmitter<Aircraft>();
    @Output() onSelectAircraftClick = new EventEmitter<number>();
    @Output() onEditAircraftClick = new EventEmitter<number>();
    @Output() onDuplicateAircraftClick = new EventEmitter<number>();
    @Output() onDeleteAircraftClick = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    protected dataSource: MatTableDataSource<ListEntry>;
    protected visibleColumns = ['vehicleType', 'registration', 'icaoType', 'icons'];

    protected readonly ButtonColor = ButtonColor;


    constructor(
        private dialog: MatDialog,
    ) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.dataSource = new MatTableDataSource<ListEntry>(this.aircraftList);
        this.dataSource.paginator = this.paginator;
    }


    protected applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    protected getAircraftIconClass(aircraft: AircraftListEntry): string {
        switch (aircraft.vehicleType) {
            case 'HELICOPTER': return 'fa-solid fa-helicopter';
            case 'AIRPLANE':
            default:
                return 'fa-solid fa-plane';
        }
    }


    protected onAddAircraftClick() {
        const dialogRef = this.dialog.open(AircraftCreateFormDialogComponent, {
            // height: '800px',
            width: '600px',
            data: {
                speedUnit: this.speedUnit,
                consumptionUnit: this.consumptionUnit,
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.aircraftAdded.emit(result.aircraft);
            }
        });
    }
}
