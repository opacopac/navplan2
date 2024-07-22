import {createAction, props} from '@ngrx/store';
import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';


export class AircraftActions {
    public static readonly readList = createAction(
        '[Aircraft Page] Read aircraft list'
    );

    public static readonly showList = createAction(
        '[Aircraft Effects] Show aircraft list',
        props<{ aircraftList: AircraftListEntry[] }>()
    );
}
