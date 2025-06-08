import {Component, OnInit} from '@angular/core';
import {getTextSearchResults} from '../../../state/ngrx/search.selectors';
import {select, Store} from '@ngrx/store';
import {SearchItem} from '../../../domain/model/search-item';
import {SearchActions} from '../../../state/ngrx/search.actions';
import {getFlightMapShowFullScreen} from '../../../../flight-map/state/ngrx/flight-map.selectors';
import {SearchBoxComponent} from '../search-box/search-box.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-search-container',
    imports: [
        CommonModule,
        SearchBoxComponent
    ],
    templateUrl: './search-container.component.html',
    styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
    protected searchResults$ = this.appStore.pipe(select(getTextSearchResults));
    protected isFullScreen$ = this.appStore.pipe(select(getFlightMapShowFullScreen));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onSearchInputChange(query: string) {
        this.appStore.dispatch(SearchActions.searchByText({query: query}));
    }


    protected onSearchButtonClick(query: string) {
        this.appStore.dispatch(SearchActions.searchByText({query: query}));
    }


    protected onResultSelected(result: SearchItem) {
        this.appStore.dispatch(SearchActions.selectTextSearchResult({searchItem: result}));
    }

    protected onSearchResultsCleared() {
        this.appStore.dispatch(SearchActions.clearTextSearchResults());
    }
}
