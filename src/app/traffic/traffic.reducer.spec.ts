import {initialTrafficState, trafficReducer} from './traffic.reducer';
import {
    ReadTrafficErrorAction,
    ReadTrafficSuccessAction,
    ReadTrafficTimerAction,
    StartWatchTrafficAction,
    StopWatchTrafficAction
} from './traffic.actions';
import {BaseMapMovedZoomedRotatedAction} from '../base-map/base-map.actions';
import {Position2d} from '../shared/model/geometry/position2d';
import {Extent} from '../shared/model/extent';
import {Angle} from '../shared/model/quantities/angle';
import {AngleUnit} from '../shared/model/units';
import {TrafficServiceStatus} from './services/traffic-service-status';
import {TrafficMock} from './test/traffic-mock';
import {TrafficMerger} from './traffic-merger/traffic-merger';


describe('trafficReducer', () => {
    beforeEach(() => {
    });


    it('creates an initial state', () => {
        const state = trafficReducer(undefined, new ReadTrafficTimerAction(0));
        expect(state).toBeDefined();
        expect(state).toEqual(initialTrafficState);
    });


    // region BASEMAP_MOVED_ZOOMED_ROTATED

    it('updates the extent on BASEMAP_MOVED_ZOOMED_ROTATED', () => {
        const pos = new Position2d(7, 47);
        const extent = Extent.createFromLatLon([6, 46, 8, 48]);
        const action = new BaseMapMovedZoomedRotatedAction(pos, 11, new Angle(0, AngleUnit.DEG), extent);
        const state = trafficReducer(undefined, action);

        expect(state.extent).toEqual(extent);
    });

    // endregion


    // region TRAFFIC_WATCH_START

    it('sets isWatching = true on TRAFFIC_WATCH_START', () => {
        const action = new StartWatchTrafficAction();
        const state = trafficReducer(undefined, action);

        expect(state.isWatching).toEqual(true);
    });


    it('sets TrafficServiceStatus.WAITING on TRAFFIC_WATCH_START', () => {
        const action = new StartWatchTrafficAction();
        const state = trafficReducer(undefined, action);

        expect(state.status).toEqual(TrafficServiceStatus.WAITING);
    });

    // endregion


    // region TRAFFIC_WATCH_STTOP

    it('sets isWatching = false on TRAFFIC_WATCH_STTOP', () => {
        const action1 = new StartWatchTrafficAction();
        const state1 = trafficReducer(undefined, action1);
        const action2 = new StopWatchTrafficAction();
        const state2 = trafficReducer(state1, action2);

        expect(state2.isWatching).toEqual(false);
    });


    it('sets TrafficServiceStatus.OFF on TRAFFIC_WATCH_STTOP', () => {
        const action1 = new StartWatchTrafficAction();
        const state1 = trafficReducer(undefined, action1);
        const action2 = new StopWatchTrafficAction();
        const state2 = trafficReducer(state1, action2);

        expect(state2.status).toEqual(TrafficServiceStatus.OFF);
    });

    // endregion


    // region TRAFFIC_READ_SUCCESS

    it('sets TrafficServiceStatus.CURRENT on TRAFFIC_READ_SUCCESS', () => {
        const state1 = { ...initialTrafficState, isWatching: true, status: TrafficServiceStatus.WAITING };
        const action2 = new ReadTrafficSuccessAction([]);
        const state2 = trafficReducer(state1, action2);

        expect(state2.status).toEqual(TrafficServiceStatus.CURRENT);
    });


    it('merges the traffic on TRAFFIC_READ_SUCCESS', () => {
        const state1 = { ...initialTrafficState, isWatching: true, status: TrafficServiceStatus.WAITING };
        const action2 = new ReadTrafficSuccessAction([TrafficMock.MOCK_TRAFFIC_1]);
        const state2 = trafficReducer(state1, action2);

        expect(state2.trafficMap.size).toEqual(1);
    });


    it('ignores TRAFFIC_READ_SUCCESS if status isWatching is false', () => {
        const state1 = { ...initialTrafficState, isWatching: false, status: TrafficServiceStatus.OFF };
        const action2 = new ReadTrafficSuccessAction([TrafficMock.MOCK_TRAFFIC_1]);
        const state2 = trafficReducer(state1, action2);

        expect(state2.trafficMap.size).toEqual(0);
        expect(state2.status).toEqual(TrafficServiceStatus.OFF);
    });


    // endregion


    // region TRAFFIC_READ_ERROR

    it('sets TrafficServiceStatus.CURRENT on TRAFFIC_READ_ERROR', () => {
        const state1 = { ...initialTrafficState, isWatching: true, status: TrafficServiceStatus.CURRENT };
        const action2 = new ReadTrafficErrorAction(new Error('MEEP'));
        const state2 = trafficReducer(state1, action2);

        expect(state2.status).toEqual(TrafficServiceStatus.ERROR);
    });


    it('ignores TRAFFIC_READ_ERROR if status isWatching is false', () => {
        const state1 = { ...initialTrafficState, isWatching: false, status: TrafficServiceStatus.OFF };
        const action2 = new ReadTrafficErrorAction(new Error('MEEP'));
        const state2 = trafficReducer(state1, action2);

        expect(state2.status).toEqual(TrafficServiceStatus.OFF);
    });

    // endregion


    // region TRAFFIC_DETAILS_READ_SUCCESS


    it('merges the traffic on TRAFFIC_DETAILS_READ_SUCCESS', () => {
        const state1 = { ...initialTrafficState, isWatching: true, status: TrafficServiceStatus.CURRENT };
        const action1 = new ReadTrafficSuccessAction([TrafficMock.MOCK_TRAFFIC_2]);
        const state2 = trafficReducer(state1, action1);
        const mockTrafficDetails = TrafficMock.MOCK_TRAFFIC_2.clone();
        mockTrafficDetails.icaoType = 'AAT3';
        const action2 = new ReadTrafficSuccessAction([mockTrafficDetails]);
        const state3 = trafficReducer(state2, action2);

        expect(state3.trafficMap.size).toEqual(1);
        const traffic_key = TrafficMerger.getTrafficMapKey(TrafficMock.MOCK_TRAFFIC_2);
        const ac = state3.trafficMap.get(traffic_key);
        expect(ac.icaoType).toEqual('AAT3');
    });


    // endregion
});
