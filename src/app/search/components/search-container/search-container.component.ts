import {Component, OnInit} from '@angular/core';
import {getSearchIsActive, getSearchResults, getSelectedIndex} from '../../search.selectors';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';
import {SearchItemList} from '../../model/search-item-list';
import {SearchItem} from '../../model/search-item';
import {
    HideSearchResultsAction,
    SearchHideAction,
    SearchItemSelectedAction,
    SearchQuerySubmittedAction
} from '../../search.actions';


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
        this.searchIsActive$ = this.appStore.pipe(select(getSearchIsActive));
        this.searchResults$ = this.appStore.pipe(select(getSearchResults));
        this.selectedIndex$ = this.appStore.pipe(select(getSelectedIndex));
    }



    ngOnInit() {
    }


    public onSearchInputChange(query: string) {
        this.appStore.dispatch(
            new SearchQuerySubmittedAction(query)
        );
    }


    public onSearchButtonClick(query: string) {
        this.appStore.dispatch(
            new SearchQuerySubmittedAction(query)
        );
    }


    public onSearchInputBlur() {
        this.appStore.dispatch(
            //new SearchHideAction()
            new HideSearchResultsAction()
        );
    }


    public onResultSelected(result: SearchItem) {
        this.appStore.dispatch(
            new SearchItemSelectedAction(result)
        );
    }
}
