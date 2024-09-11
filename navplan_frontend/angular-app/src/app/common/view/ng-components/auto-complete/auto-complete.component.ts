import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {AutoCompleteResultItem} from '../../model/auto-complete-result-item';
import {ButtonColor} from '../../model/button-color';
import {FormControl, Validators} from '@angular/forms';


@Component({
    selector: 'app-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent<T> implements OnInit, OnDestroy, OnChanges {
    @Input() public labelText: string;
    @Input() public isMandatory: boolean;
    @Input() public searchInputPlaceholderText: string;
    @Input() public minSearchTextLength: number;
    @Input() public searchResults: AutoCompleteResultItem<T>[];
    @Output() public searchInputChanged: EventEmitter<string> = new EventEmitter<string>();
    @Output() public searchResultSelected: EventEmitter<T> = new EventEmitter<T>();
    @Output() public searchResultsCleared: EventEmitter<void> = new EventEmitter<void>();

    protected readonly ButtonColor = ButtonColor;
    protected queryInput: FormControl;
    private searchResults2: AutoCompleteResultItem<T>[];

    constructor(private cdr: ChangeDetectorRef) {
    }


    ngOnInit() {
        this.initForm();
        this.searchResults2 = [... this.searchResults];
    }


    ngOnChanges() {
        this.searchResults2 = [... this.searchResults];
    }


    ngOnDestroy() {
    }


    protected getDisplayName(item: AutoCompleteResultItem<T>): string {
        return item ? item.displayName : '(none)';
    }


    protected getSearchResults(): AutoCompleteResultItem<T>[] {
        return this.searchResults2;
    }


    protected onSearchInputChanged(searchText: string) {
        if (searchText && searchText.length >= this.minSearchTextLength) {
            this.searchInputChanged.emit(searchText);
        }
    }


    protected onSearchResultSelected(selectedItem: T) {
        this.searchResultSelected.emit(selectedItem);
    }


    protected onSearchResultsCleared() {
        this.searchResultsCleared.emit();
    }


    private initForm() {
        this.queryInput = new FormControl('', this.isMandatory ? [Validators.required] : []);
    }
}
