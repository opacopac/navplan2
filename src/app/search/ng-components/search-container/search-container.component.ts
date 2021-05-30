import {Component, OnInit} from '@angular/core';
import {
    getTextSearchIsActive,
    getTextSearchResults,
    getTextSearchSelectedResultIndex
} from '../../ngrx/search.selectors';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SearchItemList} from '../../domain-model/search-item-list';
import {SearchItem} from '../../domain-model/search-item';
import {SearchActions} from '../../ngrx/search.actions';


@Component({
    selector: 'app-search-container',
    templateUrl: './search-container.component.html',
    styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent implements OnInit {
    public searchIsActive$: Observable<boolean>;
    public searchResults$: Observable<SearchItemList>;
    public selectedIndex$: Observable<number>;


    constructor(private appStore: Store<any>) {
        this.searchIsActive$ = this.appStore.pipe(select(getTextSearchIsActive));
        this.searchResults$ = this.appStore.pipe(select(getTextSearchResults));
        this.selectedIndex$ = this.appStore.pipe(select(getTextSearchSelectedResultIndex));
    }



    ngOnInit() {
    }


    public onSearchInputChange(query: string) {
        this.appStore.dispatch(SearchActions.searchByText({ query: query }));
    }


    public onSearchButtonClick(query: string) {
        this.appStore.dispatch(SearchActions.searchByText({ query: query }));
    }


    public onSearchInputBlur() {
        this.appStore.dispatch(SearchActions.hideTextSearchResults());
    }


    public onResultSelected(result: SearchItem) {
        this.appStore.dispatch(SearchActions.selectTextSearchResult({ searchItem: result }));
    }
}
