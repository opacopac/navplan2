import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AircraftTypeDesignator} from '../../../../domain/model/aircraft-type-designator';
import {AutoCompleteResultItem} from '../../../../../common/view/model/auto-complete-result-item';


@Component({
    selector: 'app-aircraft-type-designator-autocomplete',
    templateUrl: './aircraft-type-designator-autocomplete.component.html',
    styleUrls: ['./aircraft-type-designator-autocomplete.component.scss'],
})
export class AircraftTypeDesignatorAutocompleteComponent implements OnInit, OnChanges {
    @Input() initialAcTypeDesignator: string;
    @Input() acTypeDesignatorSearchResults: AircraftTypeDesignator[];
    @Output() icaoTypeSelected = new EventEmitter<string>();
    @Output() searchInputChanged = new EventEmitter<string>();

    protected acTypeDesignatorSearchResultItems: AutoCompleteResultItem<AircraftTypeDesignator>[];


    constructor() {
    }


    ngOnInit() {
        this.initSearchResultItems();
    }


    ngOnChanges() {
        this.initSearchResultItems();
    }


    protected getInitialAcTypeDesignator(): AutoCompleteResultItem<AircraftTypeDesignator> {
        return new AutoCompleteResultItem(
            null,
            this.initialAcTypeDesignator,
            this.initialAcTypeDesignator
        );
    }


    protected onSearchInputChanged(searchText: string) {
        this.searchInputChanged.emit(searchText);
    }


    protected onSearchResultSelected(acTypeDesignator: AircraftTypeDesignator) {
        this.icaoTypeSelected.emit(acTypeDesignator.designator);
    }


    protected onSearchResultsCleared() {
        this.icaoTypeSelected.emit(null);
    }


    private initSearchResultItems() {
        this.acTypeDesignatorSearchResultItems = this.acTypeDesignatorSearchResults
            ? this.acTypeDesignatorSearchResults.map(acTypeDesignator => this.toSearchResultItem(acTypeDesignator))
            : [];
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
