import {Component, OnInit} from '@angular/core';
import {getIsTextSearchActive, getTextSearchResults} from '../../../state/ngrx/search.selectors';
import {select, Store} from '@ngrx/store';
import {SearchItem} from '../../../domain/model/search-item';
import {SearchActions} from '../../../state/ngrx/search.actions';


@Component({
    selector: 'app-search-container',
    templateUrl: './search-container.component.html',
    styleUrls: ['./search-container.component.scss']
})
export class SearchContainerComponent implements OnInit {
    protected isTextSearchActive$ = this.appStore.pipe(select(getIsTextSearchActive));
    protected searchResults$ = this.appStore.pipe(select(getTextSearchResults));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onSearchInputChange(query: string) {
        this.appStore.dispatch(SearchActions.searchByText({query: query}));
    }


    public onSearchButtonClick(query: string) {
        this.appStore.dispatch(SearchActions.searchByText({query: query}));
    }


    public onSearchInputBlur() {
        this.appStore.dispatch(SearchActions.hideTextSearchResults());
    }


    public onResultSelected(result: SearchItem) {
        this.appStore.dispatch(SearchActions.selectTextSearchResult({searchItem: result}));
    }
}
