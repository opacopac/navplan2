import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AircraftTypeDesignator} from '../../../../domain/model/aircraft-type-designator';
import {AutoCompleteResultItem} from '../../../../../common/view/model/auto-complete-result-item';
import {select, Store} from '@ngrx/store';
import {getAcTypeDesignatorSearchResults} from '../../../../state/ngrx/aircraft.selectors';
import {map} from 'rxjs/operators';
import {AircraftTypeDesignatorActions} from '../../../../state/ngrx/aircraft-type-designator.actions';


@Component({
    selector: 'app-aircraft-type-designator-autocomplete',
    templateUrl: './aircraft-type-designator-autocomplete.component.html',
    styleUrls: ['./aircraft-type-designator-autocomplete.component.scss']
})
export class AircraftTypeDesignatorAutocompleteComponent implements OnInit, OnChanges {
    @Input() initialValue: string;
    @Input() labelText: string;
    @Input() isValid: boolean;
    @Output() isValidChange = new EventEmitter<boolean>();
    @Output() icaoTypeChanged = new EventEmitter<string>();
    protected readonly acTypeDesignatorSearchResults$ = this.appStore.pipe(select(getAcTypeDesignatorSearchResults));
    protected readonly acTypeDesignatorSearchResultItems$ = this.acTypeDesignatorSearchResults$.pipe(
        map(acTypeDesignators => acTypeDesignators
            ? acTypeDesignators.map(acTypeDesignator => this.toSearchResultItem(acTypeDesignator))
            : []
        )
    );


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
    }


    protected getInitialAcTypeDesignator(): AutoCompleteResultItem<AircraftTypeDesignator> {
        return new AutoCompleteResultItem(
            null,
            this.initialValue,
            this.initialValue
        );
    }


    protected onSearchInputChanged(searchText: string) {
        this.appStore.dispatch(AircraftTypeDesignatorActions.searchByTextAction({searchText: searchText}));
    }


    protected onSearchResultSelected(acTypeDesignator: AircraftTypeDesignator) {
        this.changeIcaoType(acTypeDesignator.designator);
    }


    protected onSearchResultsCleared() {
        this.appStore.dispatch(AircraftTypeDesignatorActions.clearSearchResultsAction());
        this.changeIcaoType('');
    }


    protected onBlur() {
        this.appStore.dispatch(AircraftTypeDesignatorActions.clearSearchResultsAction());
    }


    private changeIcaoType(icaoType: string) {
        this.isValidChange.emit(this.isIcaoTypeValid(icaoType));
        this.icaoTypeChanged.emit(icaoType);
    }


    private isIcaoTypeValid(icaoType: string): boolean {
        return icaoType && (icaoType.length > 0) && (icaoType.length <= 4) && /^[A-Z0-9]*$/.test(icaoType);
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
