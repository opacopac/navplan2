import {createAction} from '@ngrx/store';


export class ExporterActions {
    public static readonly exportPdf = createAction(
        '[Flightroute Page / Menu] Export route as PDF'
    );

    public static readonly exportExcel = createAction(
        '[Flightroute Page / Menu] Export route as Excel',
    );
}
