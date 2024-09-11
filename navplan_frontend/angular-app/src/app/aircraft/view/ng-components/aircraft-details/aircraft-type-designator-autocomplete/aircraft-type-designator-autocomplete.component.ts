import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AircraftTypeDesignatorActions} from '../../../../state/ngrx/aircraft-type-designator.actions';
import {AircraftTypeDesignator} from '../../../../domain/model/aircraft-type-designator';
import {AutoCompleteResultItem} from '../../../../../common/view/model/auto-complete-result-item';
import {getAcTypeDesignatorSearchResults} from '../../../../state/ngrx/aircraft.selectors';
import {map} from 'rxjs/operators';


@Component({
    selector: 'app-aircraft-type-designator-autocomplete',
    templateUrl: './aircraft-type-designator-autocomplete.component.html',
    styleUrls: ['./aircraft-type-designator-autocomplete.component.scss'],
})
export class AircraftTypeDesignatorAutocompleteComponent implements OnInit {
    protected readonly acTypeDesignatorSearchResults$ = this.appStore.pipe(
        select(getAcTypeDesignatorSearchResults),
        map(acTypeDesignators => this.toSearchResultItems(acTypeDesignators))
    );


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    protected onSearchInputChanged(searchText: string) {
        this.appStore.dispatch(AircraftTypeDesignatorActions.searchByTextAction({searchText: searchText}));
    }


    protected onSearchResultSelected(acTypeDesignator: AircraftTypeDesignator) {
        this.appStore.dispatch(AircraftTypeDesignatorActions.searchResultSelectedAction({aircraftTypeDesignator: acTypeDesignator}));
    }


    protected onSearchResultsCleared() {
        // TODO: implement
    }


    private toSearchResultItems(acTypeDesignators: AircraftTypeDesignator[]): AutoCompleteResultItem<AircraftTypeDesignator>[] {
        return acTypeDesignators
            ? acTypeDesignators.map(typeDesignator => new AutoCompleteResultItem(
                typeDesignator,
                typeDesignator.designator + ' - ' + typeDesignator.model + ' - ' + typeDesignator.manufacturer + ''
            ))
            : [];
    }
}
