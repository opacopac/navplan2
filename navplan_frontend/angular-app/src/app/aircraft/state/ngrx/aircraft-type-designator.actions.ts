import {createAction, props} from '@ngrx/store';
import {AircraftTypeDesignator} from '../../domain/model/aircraft-type-designator';


export class AircraftTypeDesignatorActions {
    public static readonly searchByTextAction = createAction(
        '[Aircraft Type Designator Dropdown] search by text',
        props<{ searchText: string }>()
    );

    public static readonly searchByTextSuccessAction = createAction(
        '[Aircraft Type Designator Effects] search by text success',
        props<{ searchResults: AircraftTypeDesignator[] }>()
    );

    public static readonly searchByTextErrorAction = createAction(
        '[Aircraft Type Designator Effects] search by text error',
        props<{ error: string }>()
    );

    public static readonly clearSearchResultsAction = createAction(
        '[Aircraft Type Designator Dropdown] clear search results'
    );
}
