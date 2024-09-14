import {Component, OnChanges, OnInit} from '@angular/core';
import {AircraftTypeDesignator} from '../../../../domain/model/aircraft-type-designator';
import {AutoCompleteResultItem} from '../../../../../common/view/model/auto-complete-result-item';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {getAcTypeDesignatorSearchResults} from '../../../../state/ngrx/aircraft.selectors';
import {map} from 'rxjs/operators';
import {AircraftTypeDesignatorActions} from '../../../../state/ngrx/aircraft-type-designator.actions';


@Component({
    selector: 'app-aircraft-type-designator-autocomplete',
    templateUrl: './aircraft-type-designator-autocomplete.component.html',
    styleUrls: ['./aircraft-type-designator-autocomplete.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: AircraftTypeDesignatorAutocompleteComponent,
    }]
})
export class AircraftTypeDesignatorAutocompleteComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
    protected readonly acTypeDesignatorSearchResults$ = this.appStore.pipe(select(getAcTypeDesignatorSearchResults));
    protected readonly acTypeDesignatorSearchResultItems$ = this.acTypeDesignatorSearchResults$.pipe(
        map(acTypeDesignators => acTypeDesignators
            ? acTypeDesignators.map(acTypeDesignator => this.toSearchResultItem(acTypeDesignator))
            : []
        )
    );

    protected icaoType = '';
    protected touched = false;
    protected disabled = false;
    protected onChange = (icaoType: string) => {};
    protected onTouched = () => {};


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
    }


    registerOnChange(fn: (icaoType: string) => {}): void {
        this.onChange = fn;
    }


    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }


    registerOnValidatorChange(fn: () => void): void {
    }


    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }


    validate(control: AbstractControl): ValidationErrors | null {
        return undefined;
    }


    writeValue(icaoType: string): void {
        this.icaoType = icaoType;
    }


    protected getInitialAcTypeDesignator(): AutoCompleteResultItem<AircraftTypeDesignator> {
        return new AutoCompleteResultItem(
            null,
            this.icaoType,
            this.icaoType
        );
    }


    protected onSearchInputChanged(searchText: string) {
        this.appStore.dispatch(AircraftTypeDesignatorActions.searchByTextAction({searchText: searchText}));
    }


    protected onSearchResultSelected(acTypeDesignator: AircraftTypeDesignator) {
        this.markAsTouched();
        if (!this.disabled) {
            this.icaoType = acTypeDesignator.designator;
            this.onChange(acTypeDesignator.designator);
        }
    }


    protected onSearchResultsCleared() {
        this.markAsTouched();
        if (!this.disabled) {
            this.icaoType = '';
            this.onChange('');
        }
    }


    private markAsTouched() {
        this.touched = true;
        this.onTouched();
    }


    private toSearchResultItem(acTypeDesignator: AircraftTypeDesignator): AutoCompleteResultItem<AircraftTypeDesignator> {
        return acTypeDesignator
            ? new AutoCompleteResultItem(
                acTypeDesignator,
                acTypeDesignator.designator + ' (' + acTypeDesignator.manufacturer + ' ' + acTypeDesignator.model + ')',
                acTypeDesignator.designator
            )
            : null;
    }
}
