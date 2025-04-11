import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {AircraftListEntry} from '../../../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../../../domain/model/aircraft';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


export interface ListEntry {
    id: number;
    vehicleType: string;
    registration: string;
    icaoType: string;
}


@Component({
    selector: 'app-aircraft-picker-list',
    standalone: true,
    imports: [
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
    ],
    templateUrl: './aircraft-picker-list.component.html',
    styleUrls: ['./aircraft-picker-list.component.scss']
})
export class AircraftPickerListComponent implements OnInit, OnChanges {
    @Input() aircraftList: AircraftListEntry[];
    @Input() currentAircraft: Aircraft;
    @Output() onSelectAircraftClick = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    protected dataSource: MatTableDataSource<ListEntry>;
    protected visibleColumns = ['vehicleType', 'registration', 'icaoType'];

    protected readonly ButtonColor = ButtonColor;


    constructor() {
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
            case 'HELICOPTER':
                return 'fa-solid fa-helicopter';
            case 'AIRPLANE':
            default:
                return 'fa-solid fa-plane';
        }
    }
}
