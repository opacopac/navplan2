import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Track} from '../../../../domain/model/track';
import {getShowTrack} from '../../../../state/ngrx/track.selectors';


@Component({
    selector: 'app-track-profile-page',
    templateUrl: './track-profile-page.component.html',
    styleUrls: ['./track-profile-page.component.scss']
})
export class TrackProfilePageComponent implements OnInit {
    public readonly selectedTrack$: Observable<Track> = this.appStore.pipe(select(getShowTrack));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }
}
