import {createAction, props} from '@ngrx/store';
import {ExportedFile} from '../domain-model/exported-file';


export class ExporterActions {
    public static readonly exportPdf = createAction(
        '[Flightroute Page / Menu] Export route as PDF'
    );

    public static readonly exportPdfSuccess = createAction(
        '[Exporter Effects] Export route as PDF success',
        props<{ exportedFile: ExportedFile }>()
    );

    public static readonly exportExcel = createAction(
        '[Flightroute Page / Menu] Export route as Excel',
    );

    public static readonly exportExcelSuccess = createAction(
        '[Exporter Effects] Export route as Excel success',
        props<{ exportedFile: ExportedFile }>()
    );
}
