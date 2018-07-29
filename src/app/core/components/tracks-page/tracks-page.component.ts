import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Track} from '../../../track/model/track';
import {getTrackList} from '../../../track/track.selectors';
import {ReadTrackListAction} from '../../../track/track.actions';


@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {
    public readonly trackList$: Observable<Track[]>;


    constructor(private appStore: Store<any>) {
        this.trackList$ = this.appStore.select(getTrackList);
    }


    ngOnInit() {
        this.appStore.dispatch(
            new ReadTrackListAction()
        );
    }
}
