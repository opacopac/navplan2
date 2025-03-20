import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Track} from '../../../../domain/model/track';
import {getShowTrack, getTrackList} from '../../../../state/ngrx/track.selectors';
import {TrackActions} from '../../../../state/ngrx/track.actions';


@Component({
    selector: 'app-track-list-page',
    templateUrl: './track-list-page.component.html',
    styleUrls: ['./track-list-page.component.scss']
})
export class TrackListPageComponent implements OnInit {
    public readonly trackList$: Observable<Track[]>;
    public readonly selectedTrack$: Observable<Track>;


    constructor(private appStore: Store<any>) {
        this.trackList$ = this.appStore.pipe(select(getTrackList));
        this.selectedTrack$ = this.appStore.pipe(select(getShowTrack));
    }


    ngOnInit() {
        this.appStore.dispatch(TrackActions.readList());
    }


    public onTrackSelected(trackId: number) {
        if (trackId) {
            this.appStore.dispatch(TrackActions.toggleSelect({trackId: trackId}));
        }
    }


    protected onExportKmlClicked(trackId: number) {
        this.appStore.dispatch(TrackActions.exportKml({trackId: trackId}));
    }


    protected onUpdateTrackClicked(track: Track) {
        this.appStore.dispatch(TrackActions.update({track: track}));
    }


    protected onDeleteTrackClicked(trackId: number) {
        if (trackId) {
            this.appStore.dispatch(TrackActions.delete({trackId: trackId}));
        }
    }
}
