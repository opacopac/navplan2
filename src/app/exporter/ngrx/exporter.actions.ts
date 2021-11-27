import {createAction, props} from '@ngrx/store';
import {ExportedFile} from '../domain-model/exported-file';


export class ExporterActions {
    public static readonly exportPdf = createAction(
        '[Flightroute Page / Navbar] Export route as PDF'
    );

    public static readonly exportExcel = createAction(
        '[Flightroute Page / Navbar] Export route as Excel',
    );

    public static readonly exportKml = createAction(
        '[Flightroute Page / Navbar] Export route/track as KML',
    );

    public static readonly exportSuccess = createAction(
        '[Exporter Effects] Export successful',
        props<{ exportedFile: ExportedFile, mimeType: string }>()
    );
}
