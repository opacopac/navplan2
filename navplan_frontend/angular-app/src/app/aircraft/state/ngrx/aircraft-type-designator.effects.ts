import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {IAircraftTypeDesignatorService} from '../../domain/service/i-aircraft-type-designator.service';
import {AircraftTypeDesignatorActions} from './aircraft-type-designator.actions';


@Injectable()
export class AircraftTypeDesignatorEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly acTypeDesignatorService: IAircraftTypeDesignatorService
    ) {
    }


    searchAcTypeDesignatorByTextAction$ = createEffect(() => this.actions$.pipe(
        ofType(AircraftTypeDesignatorActions.searchByTextAction),
        switchMap(action => this.acTypeDesignatorService.searchTypeDesignatorByText(
            action.searchText
        ).pipe(
            map(acTypeDesignators => AircraftTypeDesignatorActions.searchByTextSuccessAction({searchResults: acTypeDesignators})),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading aircraft type designators: ', error)
            })))
        ))
    ));
}
