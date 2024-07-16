import {Component, OnInit} from '@angular/core';
import {getTextSearchResults} from '../../../state/ngrx/search.selectors';
import {select, Store} from '@ngrx/store';
import {SearchItem} from '../../../domain/model/search-item';
import {SearchActions} from '../../../state/ngrx/search.actions';


@Component({
    selector: 'app-search-container',
    templateUrl: './search-container.component.html',
    styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
    protected searchResults$ = this.appStore.pipe(select(getTextSearchResults));


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
