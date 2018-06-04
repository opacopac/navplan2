import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { ButtonColor, ButtonSize } from '../buttons/button-base.directive';
import { SearchItem, SearchItemList } from '../../model/search-item';
import { DataItem } from '../../model/data-item';
import { Position2d } from '../../model/position';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter'
import 'rxjs/add/observable/fromEvent'


const MIN_QUERY_LENGTH = 3;
const QUERY_DELAY_MS = 250;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    @Output() dataItemSelected = new EventEmitter<[DataItem, Position2d]>();
    @ViewChild('searchWpInput') searchWpInput: ElementRef;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public searchResults: SearchItemList;
    public searchQuery: string;
    public selectedIndex: number;
    private keyUpSubscription: Subscription;


    constructor(
        private searchService: SearchService) {
    }


    ngOnInit() {
        this.selectedIndex = 0;
        this.keyUpSubscription = Observable.fromEvent(this.searchWpInput.nativeElement, 'keyup')
            .filter(() => this.searchQuery.trim().length >= MIN_QUERY_LENGTH)
            .distinctUntilChanged()
            .debounceTime(QUERY_DELAY_MS)
            .subscribe(() => {
                this.executeSearch();
            });
    }


    ngOnDestroy() {
        this.keyUpSubscription.unsubscribe();
    }


    public focus() {
        setTimeout(() => this.searchWpInput.nativeElement.focus(), 0);
    }


    public blur() {
        setTimeout(() => this.searchWpInput.nativeElement.blur(), 0);
    }


    public onKeyDown(event: KeyboardEvent) {
        if (!this.searchResults || this.searchResults.items.length === 0) {
            return;
        }

        switch (event.keyCode) {
            case UP_KEY_CODE:
                if (this.selectedIndex > 0) {
                    this.selectedIndex--;
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case DOWN_KEY_CODE:
                if (this.selectedIndex < this.searchResults.items.length - 1) {
                    this.selectedIndex++;
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case ENTER_KEY_CODE:
                this.onResultSelected(this.searchResults.items[this.selectedIndex]);
                event.preventDefault();
                event.stopPropagation();
                break;
            case ESC_KEY_CODE:
                this.clearSearchResults();
                this.blur();
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }


    public onBlur() {
        window.setTimeout(this.clearSearchResults.bind(this), QUERY_DELAY_MS);
    }


    public onSearchButtonClicked() {
        this.executeSearch();
    }


    public onResultSelected(result: SearchItem) {
        this.clearSearchResults();
        this.dataItemSelected.emit([result.dataItem, result.getPosition()]);
    }


    private clearSearchResults() {
        this.searchResults = undefined;
    }


    private executeSearch() {
        this.clearSearchResults();

        const query = this.searchQuery.trim();
        if (query.length >= MIN_QUERY_LENGTH) {
            this.searchService.searchByText(query, this.onSearchSuccess.bind(this), this.onSearchError.bind(this));
        }
    }


    private onSearchSuccess(results: SearchItemList) {
        this.selectedIndex = 0;
        this.searchResults = results;
    }


    private onSearchError(message: string) {
        // TODO
    }
}
