import {initialTrafficState, trafficReducer} from './traffic.reducer';
import {
    ReadTrafficErrorAction,
    ReadTrafficSuccessAction,
    ReadTrafficTimerAction,
    StartWatchTrafficAction,
    StopWatchTrafficAction
} from './traffic.actions';
import {BaseMapMovedZoomedRotatedAction} from '../../base-map/ngrx/base-map.actions';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';
import {AngleUnit} from '../../common/geo-math/domain-model/quantities/units';
import {TrafficServiceStatus} from '../domain-model/traffic-service-status';
import {MockDate} from '../../system/domain-service/date/mock-date';
import {TrafficMap} from '../domain-model/traffic-map';
import {Traffic} from '../domain-model/traffic';
import {TrafficAdsbex1Mock} from '../mocks/traffic-adsbex1.mock';


xdescribe('trafficReducer', () => {
    let mockDate: MockDate;
    let newTrafficMap: TrafficMap;
    let acNew: Traffic;
    let key: string;


    beforeEach(() => {
        mockDate = new MockDate();
        acNew = TrafficAdsbex1Mock.createTraffic();
        key = TrafficMap.getKey(acNew.address);
        newTrafficMap = new TrafficMap(mockDate);
        newTrafficMap.set(key, acNew);
    });


    it('creates an initial state', () => {
        const state = trafficReducer(undefined, new ReadTrafficTimerAction(0));
        expect(state).toBeDefined();
        expect(state).toEqual(initialTrafficState);
    });


    // region BASE_MAP_MOVED_ZOOMED_ROTATED

    it('updates the extent on BASE_MAP_MOVED_ZOOMED_ROTATED', () => {
        const pos = new Position2d(7, 47);
        const extent = new Extent2d(6, 46, 8, 48);
        const action = new BaseMapMovedZoomedRotatedAction(pos, 11, new Angle(0, AngleUnit.DEG), extent);
        const state = trafficReducer(undefined, action);

        expect(state.extent.minLon).toEqual(extent.minLon);
        expect(state.extent.minLat).toEqual(extent.minLat);
        expect(state.extent.maxLon).toEqual(extent.maxLon);
        expect(state.extent.maxLat).toEqual(extent.maxLat);
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
        const action2 = new ReadTrafficSuccessAction(newTrafficMap);
        const state2 = trafficReducer(state1, action2);

        expect(state2.status).toEqual(TrafficServiceStatus.CURRENT);
    });


    it('sets the new traffic map on TRAFFIC_READ_SUCCESS', () => {
        const state1 = { ...initialTrafficState, isWatching: true, status: TrafficServiceStatus.WAITING };
        const action2 = new ReadTrafficSuccessAction(newTrafficMap);
        const state2 = trafficReducer(state1, action2);

        expect(state2.trafficMap).toEqual(newTrafficMap);
    });


    it('ignores TRAFFIC_READ_SUCCESS if status isWatching is false', () => {
        const state1 = { ...initialTrafficState, isWatching: false, status: TrafficServiceStatus.OFF };
        const action2 = new ReadTrafficSuccessAction(newTrafficMap);
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
});
