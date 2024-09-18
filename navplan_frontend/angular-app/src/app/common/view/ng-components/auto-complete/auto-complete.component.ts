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
    @Input() public isRequired: boolean;
    @Input() public showSearchIcon: boolean;
    @Input() public searchInputPlaceholderText: string;
    @Input() public searchResults: AutoCompleteResultItem<T>[];
    @Output() public isValidChange = new EventEmitter<boolean>();
    @Output() public searchInputChanged: EventEmitter<string> = new EventEmitter<string>();
    @Output() public searchResultSelected: EventEmitter<T> = new EventEmitter<T>();
    @Output() public searchResultsCleared: EventEmitter<void> = new EventEmitter<void>();

    protected queryInput: FormControl;
    private _isValid: boolean;
    private isDirty = false;


    @Input()
    set isValid(value: boolean) {
        this._isValid = value;
    }

    get isValid(): boolean {
        return this._isValid;
    }


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
        this.isDirty = true;
        this.updateIsValid(false);
        this.searchInputChanged.emit(searchText);
    }


    protected onSearchResultSelected(selectedItem: AutoCompleteResultItem<T>) {
        this.isDirty = false;
        this.updateIsValid(true);
        this.searchResultSelected.emit(selectedItem.item);
    }


    protected onSearchResultsCleared() {
        this.isDirty = false;
        this.queryInput.setValue('');
        this.updateIsValid(!this.isRequired);
        this.searchResultsCleared.emit();
    }


    protected onSearchInputBlurred() {
        setTimeout(() => {
            if (this.isDirty) {
                this.onSearchResultsCleared();
            }
        }, 100);
    }


    protected trackByResult(index: number, item: any): any {
        return item.resultDisplayName;
    }


    private initForm() {
        const validators = this.isRequired ? [Validators.required] : [];
        this.queryInput = new FormControl(this.initialValue, validators);
    }


    private updateIsValid(value: boolean) {
        this._isValid = value;
        this.isValidChange.emit(value);
    }
}
