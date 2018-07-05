import { Component, OnInit } from '@angular/core';
import { Sessioncontext } from '../../model/session/sessioncontext';
import { SessionService } from '../../core/services/session/session.service';
import { MessageService } from '../../core/services/utils/message.service';
import { TrackService } from '../../core/services/track/track.service';
import { Track } from '../../model/track';
import { DatetimeService } from '../../core/services/utils/datetime.service';
import { Timestamp } from '../../model/quantities/timestamp';
import {ButtonColor, ButtonSize} from '../../shared/directives/button-base/button-base.directive';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
    public session: Sessioncontext;
    public trackList: Track[];
    public lastTrack: Track;
    public selectedTrack: Track;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor(
        public sessionService: SessionService,
        public messageService: MessageService,
        public trackService: TrackService) {

        this.session = sessionService.getSessionContext();
        this.trackList = [];
    }


    ngOnInit() {
        this.trackService.readUserTrackList(
            this.readTrackListSuccessCallback.bind(this),
            this.readTrackListErrorCallback.bind(this)
        );
    }


    private readTrackListSuccessCallback(trackList: Track[]) {
        this.trackList = trackList;
    }


    private readTrackListErrorCallback(message: string) {
        this.trackList = [];
        // TODO: error?
    }


    getDateString(timestamp: Timestamp): string {
        const d: Date = new Date(timestamp.epochSec * 1000);
        return DatetimeService.getYearMonthDayString(d) + ' ' + DatetimeService.getHourMinStringFromDate(d);
    }


    onTrackSelected(track: Track) {
        // TODO
    }


    onEditTrackClicked(track: Track) {
        // TODO
    }


    onRemoveTrackClicked(track: Track) {
        // TODO
    }


    onKmlClicked(track: Track) {
        // TODO
    }
}
