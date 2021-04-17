import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import {MessageService} from '../../message/domain-service/message.service';
import {FlightrouteService} from '../rest-service/flightroute.service';
import {
    SharedFlightrouteCreateAction,
    SharedFlightrouteCreateErrorAction,
    SharedFlightrouteCreateSuccessAction,
    SharedFlightrouteReadAction,
    SharedFlightrouteReadErrorAction,
    SharedFlightrouteReadSuccessAction
} from './flightroute.actions';
import {SharedFlightrouteEffects} from './shared-flightroute.effects';
import {Flightroute} from '../domain-model/flightroute';
import {MockStore} from '../../shared/test/mock-store';
import {FlightrouteState} from '../domain-model/flightroute-state';
import {Aircraft} from '../domain-model/aircraft';
import {Speed} from '../../geo-math/domain-model/quantities/speed';
import {
    ConsumptionUnit,
    LengthUnit,
    SpeedUnit,
    TimeUnit,
    VolumeUnit
} from '../../geo-math/domain-model/quantities/units';
import {Consumption} from '../../geo-math/domain-model/quantities/consumption';
import {Time} from '../../geo-math/domain-model/quantities/time';
import createSpyObj = jasmine.createSpyObj;


describe('SharedFlightrouteEffects', () => {
    let shareId, errorText: string;
    let error: Error;
    let flightroute: Flightroute;
    let initialState: FlightrouteState;
    let store: MockStore;
    let flightrouteService: jasmine.SpyObj<FlightrouteService>;
    let messageService: jasmine.SpyObj<MessageService>;


    function createEffects(actions$: Actions): SharedFlightrouteEffects {
        return new SharedFlightrouteEffects(actions$, store, flightrouteService, messageService);
    }


    beforeEach(() => {
        shareId = 'dj4kf87sdj2k';
        errorText = 'MEEP';
        error = new Error(errorText);
        initialState = {
            flightrouteList: [],
            flightroute: new Flightroute(
                -1,
                '',
                '',
                new Aircraft(
                    new Speed(100, SpeedUnit.KT),
                    new Consumption(20, ConsumptionUnit.L_PER_H)
                ),
                [],
                undefined,
                new Time(0, TimeUnit.M)
            ),
            showShareId: undefined,
            distanceUnit: LengthUnit.NM,
            speedUnit: SpeedUnit.KT,
            altitudeUnit: LengthUnit.FT,
            fuelUnit: VolumeUnit.L,
            consumptionUnit: ConsumptionUnit.L_PER_H
        };
        store = new MockStore('flightrouteState', initialState);
        flightroute = new Flightroute(123, '', '', undefined, [], undefined, undefined);
        flightrouteService = createSpyObj<FlightrouteService>('flightrouteService', ['readSharedFlightroute', 'createSharedFlightroute']);
        messageService = createSpyObj<MessageService>('messageService', ['showSuccessMessage', 'showErrorMessage']);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createEffects(action$);
        expect(effects).toBeTruthy();
    });


    // region read shared flightroute

    it('calls flightrouteService.readSharedFlightroute upon SharedFlightrouteReadAction', async () => {
        const actions$ = new Actions(of(new SharedFlightrouteReadAction(shareId)));
        flightrouteService.readSharedFlightroute.and.returnValue(of(flightroute));

        const effects = createEffects(actions$);
        await effects.readSharedFlightrouteAction$.subscribe();

        expect(flightrouteService.readSharedFlightroute).toHaveBeenCalledWith(shareId);
    });


    it('doesn NOT call flightrouteService.readSharedFlightroute upon SharedFlightrouteReadAction without a shareId', async () => {
        const actions$ = new Actions(of(new SharedFlightrouteReadAction(undefined)));
        flightrouteService.readSharedFlightroute.and.returnValue(of(flightroute));

        const effects = createEffects(actions$);
        await effects.readSharedFlightrouteAction$.subscribe();

        expect(flightrouteService.readSharedFlightroute).not.toHaveBeenCalled();
    });


    it('sends a SharedFlightrouteReadSuccessAction upon SharedFlightrouteReadAction in success case', async (done) => {
        const actions$ = new Actions(of(new SharedFlightrouteReadAction(shareId)));
        flightrouteService.readSharedFlightroute.and.returnValue(of(flightroute));

        const effects = createEffects(actions$);
        await effects.readSharedFlightrouteAction$.subscribe(action => {
            expect(action).toEqual(new SharedFlightrouteReadSuccessAction(flightroute));
            done();
        });
    });


    it('sends a SharedFlightrouteReadErrorAction upon SharedFlightrouteReadAction in error case', async (done) => {
        const actions$ = new Actions(of(new SharedFlightrouteReadAction(shareId)));
        flightrouteService.readSharedFlightroute.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.readSharedFlightrouteAction$.subscribe(action => {
            expect(action).toEqual(new SharedFlightrouteReadErrorAction(error));
            done();
        });
    });


    it('shows a error message upon SharedFlightrouteReadErrorAction', async () => {
        const actions$ = new Actions(of(new SharedFlightrouteReadErrorAction(error)));

        const effects = createEffects(actions$);
        await effects.readSharedFlightrouteErrorAction$.subscribe();

        expect(messageService.showErrorMessage).toHaveBeenCalled();
    });

    // endregion


    // region create shared flightroute

    it('calls flightrouteService.createSharedFlightroute upon SharedFlightrouteCreateAction', async () => {
        const actions$ = new Actions(of(new SharedFlightrouteCreateAction()));
        flightrouteService.createSharedFlightroute.and.returnValue(of(shareId));

        const effects = createEffects(actions$);
        await effects.createSharedFlightrouteAction$.subscribe();

        expect(flightrouteService.createSharedFlightroute).toHaveBeenCalledWith(initialState.flightroute);
    });


    it('does NOT call flightrouteService.createSharedFlightroute upon SharedFlightrouteCreateAction when current flightroute is undefined', async () => {
        const actions$ = new Actions(of(new SharedFlightrouteCreateAction()));
        store.setState('flightrouteState', { ...initialState, flightroute: undefined });
        flightrouteService.createSharedFlightroute.and.returnValue(of(shareId));

        const effects = createEffects(actions$);
        await effects.createSharedFlightrouteAction$.subscribe();

        expect(flightrouteService.createSharedFlightroute).not.toHaveBeenCalled();
    });


    it('sends a SharedFlightrouteCreateSuccessAction upon SharedFlightrouteCreateAction in success case', async (done) => {
        const actions$ = new Actions(of(new SharedFlightrouteCreateAction()));
        flightrouteService.createSharedFlightroute.and.returnValue(of(shareId));

        const effects = createEffects(actions$);
        await effects.createSharedFlightrouteAction$.subscribe(action => {
            expect(action).toEqual(new SharedFlightrouteCreateSuccessAction(shareId));
            done();
        });
    });


    it('sends a SharedFlightrouteCreateErrorAction upon SharedFlightrouteCreateAction in error case', async (done) => {
        const actions$ = new Actions(of(new SharedFlightrouteCreateAction()));
        flightrouteService.createSharedFlightroute.and.returnValue(throwError(error));

        const effects = createEffects(actions$);
        await effects.createSharedFlightrouteAction$.subscribe(action => {
            expect(action).toEqual(new SharedFlightrouteCreateErrorAction(error));
            done();
        });
    });

    // endregion
});
