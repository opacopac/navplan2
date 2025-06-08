import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Track} from '../../../../track/domain/model/track';
import {getSelectedTrack, getTrackList, getTrackTableState} from '../../../../track/state/ngrx/track.selectors';
import {TrackActions} from '../../../../track/state/ngrx/track.actions';
import {TableState} from '../../../../common/state/model/table-state';
import {TrackListTableComponent} from '../track-list-table/track-list-table.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-track-list-page',
    imports: [
        CommonModule,
        TrackListTableComponent
    ],
    templateUrl: './track-list-page.component.html',
    styleUrls: ['./track-list-page.component.scss']
})
export class TrackListPageComponent implements OnInit {
    public readonly trackList$ = this.appStore.pipe(select(getTrackList));
    public readonly selectedTrack$ = this.appStore.pipe(select(getSelectedTrack));
    public readonly tableState$ = this.appStore.pipe(select(getTrackTableState));


    constructor(private appStore: Store<any>) {
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


    protected onTableStateChanged(tableState: TableState) {
        this.appStore.dispatch(TrackActions.updateTrackTableState({tableState: tableState}));
    }
}
