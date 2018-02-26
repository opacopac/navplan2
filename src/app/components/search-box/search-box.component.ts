import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { ButtonColor, ButtonSize } from '../buttons/button-base.directive';
import { SearchItem, SearchItemList } from '../../model/search-item';
import { MapService } from '../../services/map/map.service';


const MIN_QUERY_LENGTH = 2;
const QUERY_DELAY_MS = 250;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const ENTER_KEY_CODE = 13;


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
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


    public onKeydown(event: KeyboardEvent) {
        if (!this.searchResults || this.searchResults.items.length === 0) {
            return;
        }

        switch (event.keyCode) {
            case UP_KEY_CODE:
                if (this.selectedIndex > 0) {
                    this.selectedIndex--;
                    event.stopPropagation();
                }
                break;
            case DOWN_KEY_CODE:
                if (this.selectedIndex < this.searchResults.items.length - 1) {
                    this.selectedIndex++;
                    event.stopPropagation();
                }
                break;
            case ENTER_KEY_CODE:
                this.onResultSelected(this.searchResults.items[this.selectedIndex]);
                event.stopPropagation();
                break;
        }

        // TODO: if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) { // check for ctrl+f
    }


    public onKeyup(event: KeyboardEvent) {
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

        // TODO
        this.mapService.setMapPosition(result.getPosition(), 11);
        // mapService.drawGeopointSelection([ $item ], [], undefined);*/
    }


    private clearSearchResults() {
        this.searchResults = undefined;
    }


    private executeSearch() {
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
