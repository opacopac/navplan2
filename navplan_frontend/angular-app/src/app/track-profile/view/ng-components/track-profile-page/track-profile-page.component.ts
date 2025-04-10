import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getSelectedTrack, getSelectedTrackProfile} from '../../../../track/state/ngrx/track.selectors';
import {Time} from '../../../../geo-physics/domain/model/quantities/time';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {TrackProfileTimesComponent} from '../track-profile-times/track-profile-times.component';
import {TrackProfileGraphComponent} from '../track-profile-graph/track-profile-graph.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-track-profile-page',
    standalone: true,
    imports: [
        CommonModule,
        TrackProfileTimesComponent,
        TrackProfileGraphComponent
    ],
    templateUrl: './track-profile-page.component.html',
    styleUrls: ['./track-profile-page.component.scss']
})
export class TrackProfilePageComponent implements OnInit {
    public readonly selectedTrack$ = this.appStore.pipe(select(getSelectedTrack));
    public readonly selectedTrackProfile$ = this.appStore.pipe(select(getSelectedTrackProfile));


    constructor(private appStore: Store<any>) {
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
