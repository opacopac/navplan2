import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SearchItem} from '../../../domain/model/search-item';
import {SearchItemList} from '../../../domain/model/search-item-list';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatOptionModule} from '@angular/material/core';


@Component({
    selector: 'app-search-box',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteTrigger,
        MatIconModule,
        MatAutocompleteModule,
        MatOptionModule
    ],
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    @Input() public searchResults: SearchItemList;
    @Output() public onSearchInputChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() public onSearchButtonClick: EventEmitter<string> = new EventEmitter<string>();
    @Output() public onResultSelected: EventEmitter<SearchItem> = new EventEmitter<SearchItem>();
    @Output() public onSearchResultsCleared: EventEmitter<void> = new EventEmitter<void>();

    protected readonly ButtonColor = ButtonColor;


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


    protected getDisplayName(searchItem: SearchItem): string {
        return searchItem ? searchItem.getSearchResultName() : undefined;
    }
}
