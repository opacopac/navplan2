import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TextFilterState} from '../../../state/model/text-filter-state';


@Component({
    selector: 'app-text-filter',
    templateUrl: './text-filter.component.html',
    styleUrls: ['./text-filter.component.scss']
})
export class TextFilterComponent implements OnInit, OnChanges {
    @Input() public textFilterState: TextFilterState;
    @Output() public textFilterChanged = new EventEmitter<TextFilterState>();

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
