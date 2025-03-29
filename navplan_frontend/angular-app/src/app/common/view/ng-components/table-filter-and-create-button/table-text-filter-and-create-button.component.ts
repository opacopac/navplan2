import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TextFilterState} from '../../../state/model/text-filter-state';


@Component({
    selector: 'app-table-text-filter-and-create-button',
    templateUrl: './table-text-filter-and-create-button.component.html',
    styleUrls: ['./table-text-filter-and-create-button.component.scss']
})
export class TableTextFilterAndCreateButtonComponent implements OnInit, OnChanges {
    @Input() public textFilterState: TextFilterState;
    @Input() public createButtonLabel: string;
    @Output() public textFilterChanged = new EventEmitter<TextFilterState>();
    @Output() public createButtonClicked = new EventEmitter<void>();

    protected parentForm!: FormGroup;


    constructor(
        private formBuilder: FormBuilder,
    ) {
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnChanges() {
    }


    protected onFilterTextChanged() {
        const filterValue = this.parentForm.get('filter')?.value;
        this.textFilterChanged.emit({
            filterText: filterValue
        });
    }


    protected onCreateButtonClicked() {
        this.createButtonClicked.emit();
    }


    protected onClearFilterValueClicked() {
        this.parentForm.get('filter')?.setValue('');
        this.onFilterTextChanged();
    }


    private initForm(): void {
        this.parentForm = this.formBuilder.group({
            'filter': [this.textFilterState?.filterText],
        });
    }
}
