import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Track} from '../../domain/track';
import {getShowTrack, getTrackList} from '../../ngrx/track.selectors';
import {
    DeleteTrackAction,
    EditTrackAction,
    ExportTrackKmlAction,
    ReadTrackAction,
    ReadTrackListAction
} from '../../ngrx/track.actions';


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
        this.appStore.dispatch(
            new ReadTrackListAction()
        );
    }


    public onTrackSelected(track: Track) {
        if (track.id) {
            this.appStore.dispatch(
                new ReadTrackAction(track.id)
            );
        }
    }


    public onKmlClicked(track: Track) {
        this.appStore.dispatch(
            new ExportTrackKmlAction(track)
        );
    }


    public onEditTrackClicket(track: Track) {
        this.appStore.dispatch(
            new EditTrackAction(track)
        );
    }


    public onRemoveTrackClicked(track: Track) {
        if (track.id) {
            this.appStore.dispatch(
                new DeleteTrackAction(track.id)
            );
        }
    }
}
