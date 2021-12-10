import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Track} from '../../../track/domain-model/track';
import {getShowTrack, getTrackList} from '../../../track-state/ngrx/track.selectors';
import {TrackActions} from '../../../track-state/ngrx/track.actions';


@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {
    public readonly trackList$: Observable<Track[]>;
    public readonly selectedTrack$: Observable<Track>;


    constructor(private appStore: Store<any>) {
        this.trackList$ = this.appStore.pipe(select(getTrackList));
        this.selectedTrack$ = this.appStore.pipe(select(getShowTrack));
    }


    ngOnInit() {
        this.appStore.dispatch(TrackActions.readList());
    }


    public onTrackSelected(track: Track) {
        if (track.id) {
            this.appStore.dispatch(TrackActions.toggleSelect({ trackId: track.id }));
            // this.appStore.dispatch(TrackActions.read({ trackId: track.id }));
        }
    }


    public onKmlClicked(track: Track) {
        this.appStore.dispatch(TrackActions.exportKml({ trackId: track.id }));
    }


    public onEditTrackClicket(track: Track) {
        this.appStore.dispatch(TrackActions.edit({ trackId: track.id }));
    }


    public onRemoveTrackClicked(track: Track) {
        if (track.id) {
            this.appStore.dispatch(TrackActions.delete({ trackId: track.id }));
        }
    }
}
