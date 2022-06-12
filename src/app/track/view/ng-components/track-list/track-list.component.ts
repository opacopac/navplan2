import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Track} from '../../../domain/model/track';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';


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


    public getDateString(track: Track): string {
        const d: Date = track.saveTime.date;

        return DatetimeHelper.getYearMonthDayString(d) + ' ' + DatetimeHelper.getHourMinStringFromDate(d);
    }
}
