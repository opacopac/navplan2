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


@Injectable()
export class ExporterEffects {
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private exporter: IExporterService
    ) {
    }


    exportFlightroutePdfAction$ = createEffect(() => this.actions$.pipe(
        ofType(ExporterActions.exportPdf),
        withLatestFrom(this.flightroute$),
        switchMap(([action, flightroute]) => this.exporter.exportPdf(flightroute).pipe(
            map(exportedFile => ExporterActions.exportPdfSuccess({ exportedFile: exportedFile })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error exporting PDF', error)
            })))
        )),
    ));
}
