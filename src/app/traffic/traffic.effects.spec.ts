import {Actions} from '@ngrx/effects';
import {of, throwError} from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {hot, cold} from 'jasmine-marbles';
import {TrafficEffects} from './traffic.effects';
import {TrafficOgnService} from './services/traffic-ogn.service';
import {TrafficAdsbexchangeService} from './services/traffic-adsbexchange.service';
import {Traffic} from './model/traffic';
import {TrafficOpenskyService} from './services/traffic-opensky.service';
import {ReadTrafficErrorAction, ReadTrafficSuccessAction, ReadTrafficTimerAction, StartWatchTrafficAction,
    StopWatchTrafficAction, ToggleWatchTrafficAction} from './traffic.actions';
import {Extent} from '../shared/model/extent';
import {LengthUnit} from '../shared/model/units';
import {Altitude} from '../shared/model/quantities/altitude';
import {TrafficServiceStatus} from './services/traffic-service-status';
import {TrafficState} from './traffic-state';
import {MockStore} from '../shared/test/mock-store';
import {TrafficTimerService} from './services/traffic-timer.service';



describe('TrafficEffects', () => {
    let store: MockStore;
    let trafficOgnService: TrafficOgnService;
    let trafficOpenskyService: TrafficOpenskyService;
    let trafficAdsbexchangeService: TrafficAdsbexchangeService;
    let trafficTimerService: TrafficTimerService;
    const initialTrafficState: TrafficState = {
        extent: Extent.createFromLatLon([0, 1, 2, 3]),
        sessionId: '123456',
        status: TrafficServiceStatus.CURRENT,
        isWatching: true,
        trafficMap: undefined,
        trafficMaxAltitude: new Altitude(15000, LengthUnit.FT),
    };
    const initialState = {
        trafficState: initialTrafficState
    };


    function createOgnServiceMock(response: Traffic[] | Error): SpyObj<TrafficOgnService> {
        const service = createSpyObj<TrafficOgnService>('trafficOgnService', ['readTraffic']);
        const isError = response instanceof Error;
        const serviceResponse = isError ? throwError(response as Error) : of<Traffic[]>(response as Traffic[]);
        service.readTraffic.and.returnValue(serviceResponse);

        return service;
    }


    function createOpenSkyServiceMock(response: Traffic[] | Error): SpyObj<TrafficOpenskyService> {
        const service = createSpyObj<TrafficOpenskyService>('trafficOpenSkyService', ['readTraffic']);
        const isError = response instanceof Error;
        const serviceResponse = isError ? throwError(response as Error) : of<Traffic[]>(response as Traffic[]);
        service.readTraffic.and.returnValue(serviceResponse);

        return service;
    }


    function createAdsbexServiceMock(response: Traffic[] | Error): SpyObj<TrafficAdsbexchangeService> {
        const service = createSpyObj<TrafficAdsbexchangeService>('trafficAdsbexchangeService', ['readTraffic']);
        const isError = response instanceof Error;
        const serviceResponse = isError ? throwError(response as Error) : of<Traffic[]>(response as Traffic[]);
        service.readTraffic.and.returnValue(serviceResponse);

        return service;
    }


    function createTrafficTimerServiceMock(): SpyObj<TrafficTimerService> {
        const service = createSpyObj<TrafficTimerService>('trafficTimerService', ['start', 'stop']);
        service.start.and.stub();
        service.stop.and.stub();

        return service;
    }


    function createTrafficEffects(actions$: any): TrafficEffects {
        return new TrafficEffects(
            actions$,
            store,
            trafficOgnService,
            trafficOpenskyService,
            trafficAdsbexchangeService,
            trafficTimerService
        );
    }


    beforeEach((done) => {
        store = new MockStore({ initialState: initialState});
        trafficOgnService = createOgnServiceMock([]);
        trafficOpenskyService = createOpenSkyServiceMock([]);
        trafficAdsbexchangeService = createAdsbexServiceMock([]);
        trafficTimerService = createTrafficTimerServiceMock();

        setTimeout(() => done(), 1);
    });


    it('should be created', () => {
        const action$ = new Actions(of(undefined));
        const effects = createTrafficEffects(action$);
        expect(effects).toBeTruthy();
    });


    // region toggleTrafficWatch$

    it('it dispatches a StartWatchTrafficAction on toggle action and not watching', () => {
        const action = new ToggleWatchTrafficAction();
        const action$ = new Actions(of(action));
        store.setState({ ...initialState, trafficState: { ...initialTrafficState, isWatching: false }} );
        const effects = createTrafficEffects(action$);
        effects.toggleTrafficWatch$.subscribe(toggleTrafficWatch => {
            expect(toggleTrafficWatch).toEqual(jasmine.any(StartWatchTrafficAction));
        });
    });


    it('it dispatches a StopWatchTrafficAction on toggle action and already watching', () => {
        const action = new ToggleWatchTrafficAction();
        const action$ = new Actions(of(action));
        store.setState({ ...initialState, trafficState: { ...initialTrafficState, isWatching: true }} );
        const effects = createTrafficEffects(action$);
        effects.toggleTrafficWatch$.subscribe(toggleTrafficWatch => {
            expect(toggleTrafficWatch).toEqual(jasmine.any(StopWatchTrafficAction));
        });
    });

    // endregion


    // region startTrafficWatch$

    it('starts the traffic timer after StartWatchTrafficAction', () => {
        const action$ = of(new StartWatchTrafficAction());
        const effects = createTrafficEffects(action$);

        effects.startTrafficWatch$.subscribe(() => {
            expect(trafficTimerService.start).toHaveBeenCalled();
        });
    });

    // endregion


    // region stopTrafficWatch$

    it('stops the traffic timer after StopWatchTrafficAction', () => {
        const action$ = of(new StopWatchTrafficAction());
        const effects = createTrafficEffects(action$);

        effects.stopTrafficWatch$.subscribe(() => {
            expect(trafficTimerService.stop).toHaveBeenCalled();
        });
    });

    // endregion


    // region readOgnTraffic$

    it('calls TrafficOgnService.readTraffic on ReadTrafficTimerAction', () => {
        const action = new ReadTrafficTimerAction(1);
        const action$ = new Actions(of(action));
        const effects = createTrafficEffects(action$);
        effects.readOgnTraffic$.subscribe(readOgnTraffic => {
            expect(trafficOgnService.readTraffic).toHaveBeenCalled();
        });
    });


    it('dispatches a ReadTrafficSuccessAction after success response from TrafficOgnService.readTraffic', () => {
        const action = new ReadTrafficTimerAction(1);
        const action$ = new Actions(of(action));
        const effects = createTrafficEffects(action$);
        effects.readOgnTraffic$.subscribe(readOgnTraffic => {
            expect(readOgnTraffic).toEqual(jasmine.any(ReadTrafficSuccessAction));
        });
    });


    it('dispatches a ReadTrafficErrorAction after error response from TrafficOgnService.readTraffic', () => {
        const action = new ReadTrafficTimerAction(1);
        const action$ = new Actions(of(action));
        trafficOgnService = createOgnServiceMock(new Error('MEEP'));
        const effects = createTrafficEffects(action$);
        effects.readOgnTraffic$.subscribe(readOgnTraffic => {
            expect(readOgnTraffic).toEqual(jasmine.any(ReadTrafficErrorAction));
        });
    });


    it('does NOT terminate the stream after an error response from TrafficOgnService.readTraffic', () => {
        const action$ = cold('a-b-c', {
            a: new ReadTrafficTimerAction(1),
            b: new ReadTrafficTimerAction(2),
            c: new ReadTrafficTimerAction(3)
        });
        const error = new Error('MEEP');
        trafficOgnService = createOgnServiceMock(error);
        const effects = createTrafficEffects(action$);

        const reAction$ = cold('a-b-c', {
            a: new ReadTrafficErrorAction(error),
            b: new ReadTrafficErrorAction(error),
            c: new ReadTrafficErrorAction(error)
        });
        expect(effects.readOgnTraffic$).toBeObservable(reAction$);
    });

    // endregion


    // region readOpenSkyTraffic$

    it('calls TrafficOpenskyService.readTraffic on ReadTrafficTimerAction', () => {
        const action = new ReadTrafficTimerAction(2);
        const action$ = new Actions(of(action));
        const effects = createTrafficEffects(action$);
        effects.readOpenSkyTraffic$.subscribe(readOgnTraffic => {
            expect(trafficOpenskyService.readTraffic).toHaveBeenCalled();
        });
    });


    it('dispatches a ReadTrafficSuccessAction after success response from TrafficOpenskyService.readTraffic', () => {
        const action = new ReadTrafficTimerAction(1);
        const action$ = new Actions(of(action));
        const effects = createTrafficEffects(action$);
        effects.readOpenSkyTraffic$.subscribe(readOpenSkyTraffic => {
            expect(readOpenSkyTraffic).toEqual(jasmine.any(ReadTrafficSuccessAction));
        });
    });


    it('dispatches a ReadTrafficErrorAction after error response from TrafficOpenskyService.readTraffic', () => {
        const action = new ReadTrafficTimerAction(1);
        const action$ = new Actions(of(action));
        trafficOpenskyService = createOpenSkyServiceMock(new Error('MEEP'));
        const effects = createTrafficEffects(action$);
        effects.readOpenSkyTraffic$.subscribe(readOpenSkyTraffic => {
            expect(readOpenSkyTraffic).toEqual(jasmine.any(ReadTrafficErrorAction));
        });
    });


    it('does NOT terminate the stream after an error response from TrafficOpenskyService.readTraffic', () => {
        const action$ = cold('a-b-c', {
            a: new ReadTrafficTimerAction(1),
            b: new ReadTrafficTimerAction(2),
            c: new ReadTrafficTimerAction(3)
        });
        const error = new Error('MEEP');
        trafficOpenskyService = createOpenSkyServiceMock(error);
        const effects = createTrafficEffects(action$);

        const reAction$ = cold('a-b-c', {
            a: new ReadTrafficErrorAction(error),
            b: new ReadTrafficErrorAction(error),
            c: new ReadTrafficErrorAction(error)
        });
        expect(effects.readOpenSkyTraffic$).toBeObservable(reAction$);
    });

    // endregion


    // region readAdsbExTraffic$

    it('calls TrafficAdsbexchangeService.readTraffic on ReadTrafficTimerAction', () => {
        const action = new ReadTrafficTimerAction(3);
        const action$ = new Actions(of(action));
        const effects = createTrafficEffects(action$);
        effects.readAdsbExTraffic$.subscribe(readOgnTraffic => {
            expect(trafficAdsbexchangeService.readTraffic).toHaveBeenCalled();
        });
    });


    it('dispatches a ReadTrafficSuccessAction after success response from TrafficAdsbexchangeService.readTraffic', () => {
        const action = new ReadTrafficTimerAction(1);
        const action$ = new Actions(of(action));
        const effects = createTrafficEffects(action$);
        effects.readAdsbExTraffic$.subscribe(readAdsbExTraffic => {
            expect(readAdsbExTraffic).toEqual(jasmine.any(ReadTrafficSuccessAction));
        });
    });


    it('dispatches a ReadTrafficErrorAction after error response from TrafficAdsbexchangeService.readTraffic', () => {
        const action = new ReadTrafficTimerAction(1);
        const action$ = new Actions(of(action));
        trafficAdsbexchangeService = createAdsbexServiceMock(new Error('MEEP'));
        const effects = createTrafficEffects(action$);
        effects.readAdsbExTraffic$.subscribe(readAdsbExTraffic => {
            expect(readAdsbExTraffic).toEqual(jasmine.any(ReadTrafficErrorAction));
        });
    });


    it('does NOT terminate the stream after an error response from TrafficAdsbexchangeService.readTraffic', () => {
        const action$ = cold('a-b-c', {
            a: new ReadTrafficTimerAction(1),
            b: new ReadTrafficTimerAction(2),
            c: new ReadTrafficTimerAction(3)
        });
        const error = new Error('MEEP');
        trafficAdsbexchangeService = createAdsbexServiceMock(error);
        const effects = createTrafficEffects(action$);

        const reAction$ = cold('a-b-c', {
            a: new ReadTrafficErrorAction(error),
            b: new ReadTrafficErrorAction(error),
            c: new ReadTrafficErrorAction(error)
        });
        expect(effects.readAdsbExTraffic$).toBeObservable(reAction$);
    });

    // endregion


    // region updateTrafficDisplay$

    /*it('it sends a updates the display after a success response', (done) => {
        const action = new ToggleWatchTrafficAction();
        const action$ = new Actions(of(action));
        store.setState({ ...initialTrafficState, trafficState: { ...initialTrafficState, isWatching: false }} );
        const effects = createTrafficEffects(action$);
        effects.updateTrafficDisplay$.subscribe(toggleTrafficWatch => {
            expect(toggleTrafficWatch).toEqual(jasmine.any(StartWatchTrafficAction));
        });
    });*/

    // endregion

});