import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {Track} from '../../../../track/domain/model/track';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MatDialog} from '@angular/material/dialog';
import {Timestamp} from '../../../../geo-physics/domain/model/quantities/timestamp';
import {
    TrackEditFormDialogComponent
} from '../track-edit-form-dialog/track-edit-form-dialog.component';
import {TableState} from '../../../../common/state/model/table-state';
import {TextFilterState} from '../../../../common/state/model/text-filter-state';
import {
    TableTextFilterAndCreateButtonComponent
} from '../../../../common/view/ng-components/table-filter-and-create-button/table-text-filter-and-create-button.component';
import {
    IconButtonComponent
} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {CommonModule} from '@angular/common';
import {
    ConfirmDeleteDialogComponent
} from '../../../../common/view/ng-components/confirm-delete-dialog/confirm-delete-dialog-component.component';


export interface ListEntry {
    id: number;
    name: string;
    saveTime: Timestamp;
}


@Component({
    selector: 'app-track-list-table',
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        IconButtonComponent,
        TableTextFilterAndCreateButtonComponent,
    ],
    templateUrl: './track-list-table.component.html',
    styleUrls: ['./track-list-table.component.scss']
})
export class TrackListTableComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() public trackList: Track[];
    @Input() public selectedTrack: Track;
    @Input() public tableState: TableState;
    @Output() public trackSelected = new EventEmitter<number>();
    @Output() public updateTrackClicked = new EventEmitter<Track>();
    @Output() public deleteTrackClicked = new EventEmitter<number>();
    @Output() public exportKmlClicked = new EventEmitter<number>();
    @Output() public tableStateChanged = new EventEmitter<TableState>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    protected readonly dataSource = new MatTableDataSource<ListEntry>();
    protected readonly visibleColumns = ['date', 'name', 'status', 'icons'];
    protected readonly ButtonColor = ButtonColor;


    constructor(private dialog: MatDialog) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.initTable();
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.initTable();
    }


    protected trackByFn(index: number, item: ListEntry): number {
        return item.id;
    }


    protected getDateString(track: Track): string {
        const d: Date = track.saveTime.date;

        return DatetimeHelper.getYearMonthDayString(d) + ' ' + DatetimeHelper.getHourMinStringFromDate(d);
    }


    protected onEditTrackClick(track: Track) {
        const dialogRef = this.dialog.open(TrackEditFormDialogComponent, {
            width: '400px',
            data: {
                track: track
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.track) {
                this.updateTrackClicked.emit(result.track);
            }
        });
    }


    protected onDeleteTrackClick(track: Track) {
        const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
            width: '400px',
            data: {
                title: 'Delete Track "' + track.name + '"',
                text: `Are you sure you want to delete this track?`,
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.confirmDeletion) {
                this.deleteTrackClicked.emit(track.id);
            }
        });
    }


    protected onTextFilterChanged(textFilterState: TextFilterState) {
        this.tableStateChanged.emit({
            textFilterState: textFilterState,
            paginatorState: {
                pageSize: this.paginator.pageSize,
                currentPage: this.paginator.pageIndex
            }
        });
    }


    protected onPageChange($event: PageEvent) {
        this.tableStateChanged.emit({
            textFilterState: this.tableState.textFilterState,
            paginatorState: {
                pageSize: $event.pageSize,
                currentPage: $event.pageIndex
            }
        });
    }


    private initTable(): void {
        if (this.trackList && this.paginator) {
            this.dataSource.data = this.trackList;
        }

        if (this.tableState && this.paginator) {
            this.paginator.pageSize = this.tableState.paginatorState.pageSize;
            this.paginator.pageIndex = this.tableState.paginatorState.currentPage;
        }

        if (this.tableState && this.dataSource) {
            this.dataSource.filter = this.tableState.textFilterState.filterText;
        }
    }
}
