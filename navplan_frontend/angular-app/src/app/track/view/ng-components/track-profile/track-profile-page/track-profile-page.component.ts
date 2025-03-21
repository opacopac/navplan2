import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getSelectedTrack, getSelectedTrackProfile} from '../../../../state/ngrx/track.selectors';


@Component({
    selector: 'app-track-profile-page',
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
}
