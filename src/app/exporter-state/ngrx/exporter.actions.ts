import {createAction, props} from '@ngrx/store';
import {ExportedFile} from '../../exporter/domain-model/exported-file';


export class ExporterActions {
    public static readonly exportPdf = createAction(
        '[Flightroute Page / Navbar] Export route/fuel as PDF'
    );

    public static readonly exportExcel = createAction(
        '[Flightroute Page / Navbar] Export route/fuel as Excel',
    );

    public static readonly exportKml = createAction(
        '[Flightroute Page / Navbar] Export route/track as KML',
    );

    public static readonly exportGpx = createAction(
        '[Flightroute Page / Navbar] Export route/track as GPХ',
    );

    public static readonly exportFpl = createAction(
        '[Flightroute Page / Navbar] Export route as FPL',
    );

    public static readonly exportSuccess = createAction(
        '[Exporter Effects] Export successful',
        props<{ exportedFile: ExportedFile }>()
    );
}
