import {initialTextFilterState, TextFilterState} from './text-filter-state';
import {initialPaginatorState, PaginatorState} from './paginator-state';


export const initialTableState: TableState = {
    textFilterState: initialTextFilterState,
    paginatorState: initialPaginatorState
};


export interface TableState {
    textFilterState: TextFilterState;
    paginatorState: PaginatorState;
}
