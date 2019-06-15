import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Track} from '../../domain/track';
import {DatetimeService} from '../../../shared/services/datetime/datetime.service';
import {Timestamp} from '../../../shared/model/quantities/timestamp';


@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
    @Input() public trackList: Track[];
    @Input() public selectedTrack: Track;
    @Output() public onTrackSelected = new EventEmitter<Track>();
    @Output() public onEditTrackClicked = new EventEmitter<Track>();
    @Output() public onRemoveTrackClicked = new EventEmitter<Track>();
    @Output() public onKmlClicked = new EventEmitter<Track>();


    constructor() {
    }


    ngOnInit() {
    }


    public getDisplayColumns(): string[] {
        return ['date', 'name', 'status', 'kml', 'edit', 'delete'];
    }


    public getDateString(timestamp: Timestamp): string {
        const d: Date = new Date(timestamp.epochSec * 1000);
        return DatetimeService.getYearMonthDayString(d) + ' ' + DatetimeService.getHourMinStringFromDate(d);
    }
}
