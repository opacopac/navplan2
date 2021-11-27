import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {getFlightroute} from '../../flightroute/ngrx/flightroute.selectors';
import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {MessageActions} from '../../message/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';
import {ExporterActions} from './exporter.actions';
import {IExporterService} from '../domain-service/i-exporter-service';
import {Track} from '../../track/domain-model/track';
import {Timestamp} from '../../common/geo-math/domain-model/quantities/timestamp';


@Injectable()
export class ExporterEffects {
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));
    private track$: Observable<Track> = of(new Track(123, 'TODO', [], Timestamp.now()));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private exporter: IExporterService
    ) {
    }


    exportPdfAction$ = createEffect(() => this.actions$.pipe(
        ofType(ExporterActions.exportPdf),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => this.exporter.exportPdf(flightroute).pipe(
            map(exportedFile => ExporterActions.exportSuccess({
                exportedFile: exportedFile,
                mimeType: 'application/pdf'
            })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error exporting PDF', error)
            })))
        )),
    ));


    exportExcelAction$ = createEffect(() => this.actions$.pipe(
        ofType(ExporterActions.exportExcel),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => this.exporter.exportPdf(flightroute).pipe( // TODO
            map(exportedFile => ExporterActions.exportSuccess({
                exportedFile: exportedFile,
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error exporting Excel', error)
            })))
        )),
    ));


    exportKmlAction$ = createEffect(() => this.actions$.pipe(
        ofType(ExporterActions.exportKml),
        withLatestFrom(this.flightroute$, this.track$),
        switchMap(([action, flightroute, track]) => this.exporter.exportKml(flightroute, track).pipe(
            map(exportedFile => ExporterActions.exportSuccess({
                exportedFile: exportedFile,
                mimeType: 'application/vnd.google-earth.kml+xml'
            })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error exporting Excel', error)
            })))
        )),
    ));
}
