import {createAction, props} from '@ngrx/store';


export class FlightRouteExportActions {
    public static readonly exportPdf = createAction(
        '[Flightroute Page / Menu] Export route as PDF',
        props<{ flightrouteId: number }>()
    );
    public static readonly exportExcel = createAction(
        '[Flightroute Page / Menu] Export route as Excel',
        props<{ flightrouteId: number }>()
    );
}
