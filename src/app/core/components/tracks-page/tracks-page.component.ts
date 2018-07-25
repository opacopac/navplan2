import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Track} from '../../../location/model/track';
import {getTrackList} from '../../../location/location.selectors';
import {ReadTrackListAction} from '../../../location/location.actions';


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
