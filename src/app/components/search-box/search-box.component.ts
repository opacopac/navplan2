import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { ButtonColor, ButtonSize } from '../buttons/button-base.directive';
import { SearchItem, SearchItemList } from '../../model/search-item';
import { MapService } from '../../services/map/map.service';
import { DataItem } from '../../model/data-item';
import { Position2d } from '../../model/position';


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
export class SearchBoxComponent implements OnInit {
    @Output() dataItemSelected = new EventEmitter<[DataItem, Position2d]>();
    @ViewChild('searchWpInput') searchWpInput: ElementRef;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public searchResults: SearchItemList;
    public searchQuery: string;
    public selectedIndex: number;
    private lastQuery: string;
    private currentTimer: number;


    constructor(
        private searchService: SearchService,
        private mapService: MapService) {
    }


    ngOnInit() {
        this.selectedIndex = 0;
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


    public onKeyUp(event: KeyboardEvent) {
        if (this.searchQuery === this.lastQuery) {
            return;
        } else {
            this.lastQuery = this.searchQuery;
        }

        if (this.currentTimer) {
            window.clearTimeout(this.currentTimer);
        }

        this.currentTimer = window.setTimeout(this.executeSearch.bind(this), QUERY_DELAY_MS);
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
