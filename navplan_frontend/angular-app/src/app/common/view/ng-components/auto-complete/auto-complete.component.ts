import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AutoCompleteResultItem} from '../../model/auto-complete-result-item';
import {FormControl, Validators} from '@angular/forms';


@Component({
    selector: 'app-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent<T> implements OnInit, OnChanges {
    @Input() public initialValue: AutoCompleteResultItem<T>;
    @Input() public labelText: string;
    @Input() public isMandatory: boolean;
    @Input() public showSearchIcon: boolean;
    @Input() public searchInputPlaceholderText: string;
    @Input() public minSearchTextLength: number;
    @Input() public searchResults: AutoCompleteResultItem<T>[];
    @Output() public searchInputChanged: EventEmitter<string> = new EventEmitter<string>();
    @Output() public searchResultSelected: EventEmitter<T> = new EventEmitter<T>();
    @Output() public searchResultsCleared: EventEmitter<void> = new EventEmitter<void>();
    @Output() public blur: EventEmitter<void> = new EventEmitter<void>();

    protected queryInput: FormControl;

    constructor() {
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnChanges() {
    }


    protected getResultDisplayName(item: AutoCompleteResultItem<T>): string {
        return item ? item.resultDisplayName : '';
    }


    protected getSelectedDisplayName(item: AutoCompleteResultItem<T>): string {
        return item ? item.selectedDisplayName : '';
    }


    protected getSearchResults(): AutoCompleteResultItem<T>[] {
        return this.searchResults;
    }


    protected onSearchInputChanged(searchText: string) {
        if (searchText && searchText.length >= this.minSearchTextLength) {
            this.searchInputChanged.emit(searchText);
        }
    }


    protected onSearchResultSelected(selectedItem: AutoCompleteResultItem<T>) {
        this.searchResultSelected.emit(selectedItem.item);
    }


    protected onSearchResultsCleared() {
        this.searchResultsCleared.emit();
    }


    protected onSearchInputBlurred() {
        this.initForm(); // restore previous value
        this.blur.emit();
    }


    private initForm() {
        this.queryInput = new FormControl(this.initialValue, this.isMandatory ? [Validators.required] : []);
    }
}
