import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SearchItem} from '../../../domain/model/search-item';
import {SearchItemList} from '../../../domain/model/search-item-list';


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    @Input() public searchResults: SearchItemList;
    @Output() public onSearchInputChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() public onSearchButtonClick: EventEmitter<string> = new EventEmitter<string>();
    @Output() public onSearchInputBlur: EventEmitter<null> = new EventEmitter<null>();
    @Output() public onResultSelected: EventEmitter<SearchItem> = new EventEmitter<SearchItem>();


    constructor() {
    }


    ngOnInit() {
        /* TODO --> core
        const F3_KEY_CODE = 114;
        const F_KEY_CODE = 70;
        this.keyDownSubscription = fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
            // search: f3 or ctrl + f
            if (event.keyCode === F3_KEY_CODE || (event.ctrlKey && event.keyCode === F_KEY_CODE)) {
                this.focus();
                event.preventDefault();
                event.stopPropagation();
            }
        });
        public focus() {
            // setTimeout(() => this.searchInput.nativeElement.focus(), 0);
        }
        */
    }


    ngOnDestroy() {
    }


    public getDisplayName(searchItem: SearchItem): string {
        return searchItem ? searchItem.getSearchResultName() : undefined;
    }
}
