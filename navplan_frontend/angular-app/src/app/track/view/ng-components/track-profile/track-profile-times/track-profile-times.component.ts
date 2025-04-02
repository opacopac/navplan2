import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getSelectedTrack, getSelectedTrackProfile} from '../../../../state/ngrx/track.selectors';
import {Time} from '../../../../../geo-physics/domain/model/quantities/time';
import {StringnumberHelper} from '../../../../../system/domain/service/stringnumber/stringnumber-helper';
import {TrackProfile} from '../../../../domain/model/track-profile';


@Component({
    selector: 'app-track-profile-times',
    templateUrl: './track-profile-times.component.html',
    styleUrls: ['./track-profile-times.component.scss']
})
export class TrackProfileTimesComponent implements OnInit {
    @Input() trackProfile: TrackProfile;


    constructor() {
    }


    ngOnInit() {
    }


    protected getDurationString(time: Time): string {
        const hhMm = time.getHourMinutes();
        return StringnumberHelper.zeroPad(hhMm[0], 2) + ':' + StringnumberHelper.zeroPad(hhMm[1], 2);
    }


    protected getDateHhMmString(date: Date): string {
        return StringnumberHelper.zeroPad(date.getHours(), 2) + ':' + StringnumberHelper.zeroPad(date.getMinutes(), 2);
    }
}
