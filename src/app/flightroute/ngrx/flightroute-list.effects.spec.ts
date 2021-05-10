import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {MessageService} from '../../message/domain-service/message.service';
import {MockStore} from '../../common/test/mock-store';
import {FlightrouteListEffects} from './flightroute-list.effects';
import {FlightrouteService} from '../rest-service/flightroute.service';
import {
    FlightrouteReadListAction,
    FlightrouteReadListErrorAction,
    FlightrouteReadListSuccessAction
} from './flightroute.actions';
import {UserState} from '../../user/ngrx/user-state';
import {User} from '../../user/domain-model/user';
import createSpyObj = jasmine.createSpyObj;


describe('FlightrouteListEffects', () => {
    let errorText: string;
    let error: Error;
    let user: User;
    let initialState: UserState;
    let store: MockStore;
    let flightrouteService: jasmine.SpyObj<FlightrouteService>;
    let messageService: jasmine.SpyObj<MessageService>;


    function createEffects(actions$: Actions): FlightrouteListEffects {
        return new FlightrouteListEffects(actions$, store, flightrouteService, messageService);
    }


    beforeEach(() => {
        errorText = 'MEEP';
        error = new Error(errorText);
        user = new User('test@navplan.ch', '12345');
        initialState = {
            currentUser: user,
            registerEmailSentTo: undefined,
            lostPwEmailSentTo: undefined
        };
        store = new MockStore('userState', initialState);
        flightrouteService = createSpyObj<FlightrouteService>('flightrouteService', ['readFlightrouteList']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    it('calls flightrouteService.readFlightrouteList upon FlightrouteReadListAction', async () => {
        const actions$ = new Actions(of(new FlightrouteReadListAction()));
        flightrouteService.readFlightrouteList.and.returnValue(of([]));

        const effects = createEffects(actions$);
        await effects.readFlightrouteListAction$.subscribe();

        expect(flightrouteService.readFlightrouteList).toHaveBeenCalledWith(initialState.currentUser);
    });


    it('does NOT call flightrouteService.readFlightrouteList upon FlightrouteReadListAction without a current user', async () => {
        const actions$ = new Actions(of(new FlightrouteReadListAction()));
        store.setState('userState', { ...initialState, currentUser: undefined });
        flightrouteService.readFlightrouteList.and.returnValue(of([]));

        const effects = createEffects(actions$);
        await effects.readFlightrouteListAction$.subscribe();

        expect(flightrouteService.readFlightrouteList).not.toHaveBeenCalled();
    });


    it('sends a FlightrouteReadListSuccessAction upon FlightrouteReadListAction in success case', async (done) => {
        const actions$ = new Actions(of(new FlightrouteReadListAction()));
        flightrouteService.readFlightrouteList.and.returnValue(of([]));

        const effects = createEffects(actions$);
        await effects.readFlightrouteListAction$.subscribe(action => {
            expect(action).toEqual(new FlightrouteReadListSuccessAction([]));
            done();
        });
    });


    it('sends a FlightrouteReadListErrorAction upon FlightrouteReadListAction in error case', async (done) => {
        const actions$ = new Actions(of(new FlightrouteReadListAction()));
        flightrouteService.readFlightrouteList.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.readFlightrouteListAction$.subscribe(action => {
            expect(action).toEqual(new FlightrouteReadListErrorAction(error));
            done();
        });
    });


    it('shows a error message upon FlightrouteReadListErrorAction', async () => {
        const actions$ = new Actions(of(new FlightrouteReadListErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.readFlightrouteListErrorAction$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });
});
