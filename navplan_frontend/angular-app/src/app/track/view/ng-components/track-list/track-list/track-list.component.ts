import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Track} from '../../../../domain/model/track';
import {DatetimeHelper} from '../../../../../system/domain/service/datetime/datetime-helper';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {MatDialog} from '@angular/material/dialog';
import {Timestamp} from '../../../../../geo-physics/domain/model/quantities/timestamp';
import {TrackDeleteConfirmDialogComponent} from '../track-delete-confirm-dialog/track-delete-confirm-dialog.component';
import {TrackEditFormDialogComponent} from '../track-edit-form-dialog/track-edit-form-dialog.component';


export interface ListEntry {
    id: number;
    name: string;
    saveTime: Timestamp;
}


@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnChanges {
    @Input() public trackList: Track[];
    @Input() public selectedTrack: Track;
    @Output() public trackSelected = new EventEmitter<number>();
    @Output() public updateTrackClicked = new EventEmitter<Track>();
    @Output() public deleteTrackClicked = new EventEmitter<number>();
    @Output() public exportKmlClicked = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    protected dataSource: MatTableDataSource<ListEntry>;
    protected visibleColumns = ['date', 'name', 'status', 'icons'];
    protected readonly ButtonColor = ButtonColor;


    constructor(
        private dialog: MatDialog,
    ) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.dataSource = new MatTableDataSource<ListEntry>(this.trackList);
        this.dataSource.paginator = this.paginator;
    }


    protected getDateString(track: Track): string {
        const d: Date = track.saveTime.date;

        return DatetimeHelper.getYearMonthDayString(d) + ' ' + DatetimeHelper.getHourMinStringFromDate(d);
    }

    protected applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
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
        const dialogRef = this.dialog.open(TrackDeleteConfirmDialogComponent, {
            width: '400px',
            data: {
                track: track
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.confirmDeletion) {
                this.deleteTrackClicked.emit(track.id);
            }
        });
    }
}
