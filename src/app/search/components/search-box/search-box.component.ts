import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/fromEvent';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {SearchItem} from '../../model/search-item';
import {SearchItemList} from '../../model/search-item-list';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {getSearchResults, getSelectedIndex} from '../../search.selectors';
import {
    HideSearchResultsAction, NextSearchItemAction,
    PrevSearchItemAction,
    SearchQuerySubmittedAction,
    SearchItemSelectedAction
} from '../../search.actions';
import {Subscription} from 'rxjs/Subscription';


const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;
const F3_KEY_CODE = 114;
const F_KEY_CODE = 70;


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    public readonly ButtonSize = ButtonSize;
    public readonly ButtonColor = ButtonColor;
    public searchResults$: Observable<SearchItemList>;
    public selectedIndex$: Observable<number>;
    private keyDownSubscription: Subscription;


    constructor(private appStore: Store<any>) {
        this.searchResults$ = this.appStore.select(getSearchResults);
        this.selectedIndex$ = this.appStore.select(getSelectedIndex);
    }


    ngOnInit() {
        this.keyDownSubscription = Observable.fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
            // search: f3 or ctrl + f
            if (event.keyCode === F3_KEY_CODE || (event.ctrlKey && event.keyCode === F_KEY_CODE)) {
                this.focus();
                event.preventDefault();
                event.stopPropagation();
            }
        });
    }


    ngOnDestroy() {
        this.keyDownSubscription.unsubscribe();
    }


    public focus() {
        // setTimeout(() => this.searchInput.nativeElement.focus(), 0);
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
            new HideSearchResultsAction()
        );
    }


    public onResultSelected(result: SearchItem) {
        this.appStore.dispatch(
            new SearchItemSelectedAction(result)
        );
    }


    public onSearchInputKeyDown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case UP_KEY_CODE:
                this.appStore.dispatch(
                    new PrevSearchItemAction()
                );
                break;
            case DOWN_KEY_CODE:
                this.appStore.dispatch(
                    new NextSearchItemAction()
                );
                break;
            case ENTER_KEY_CODE:
                this.appStore.dispatch(
                    new SearchItemSelectedAction(undefined) // TODO
                );
                break;
            case ESC_KEY_CODE:
                this.appStore.dispatch(
                    new HideSearchResultsAction()
                );
        }
    }
}
