import {Traffic, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficPosition} from '../model/traffic-position';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {TrafficMerger} from './traffic-merger';
import {TrafficMock} from '../test/traffic-mock';
import {TrafficMergerPositions} from './traffic-merger-positions';


describe('TrafficMerger', () => {
    let pos1, pos2, pos3: TrafficPosition;
    let acOld1, acNew1, acNew2: Traffic;
    let trafficMap: Map<string, Traffic>;
    let newTrafficList: Traffic[];


    beforeEach(() => {
        const timSec = Timestamp.now().epochSec;
        pos1 = TrafficMock.createPosition(7.0, 47.0, timSec - 3);
        pos2 = TrafficMock.createPosition(7.1, 47.1, timSec - 2);
        pos3 = TrafficMock.createPosition(7.2, 47.2, timSec - 1);
        acOld1 = TrafficMock.MOCK_TRAFFIC_1.clone();
        acOld1.acAddress = 'AAAAAA';
        acOld1.positions = [pos1, pos2];
        acNew1 = acOld1.clone();
        acNew1.acAddress = 'AAAAAA';
        acNew1.positions = [pos3];
        acNew2 = acOld1.clone();
        acNew2.acAddress = 'BBBBBB';
        trafficMap = new Map<string, Traffic>();
        trafficMap.set(TrafficMerger.getTrafficMapKey(acOld1), acOld1);
        newTrafficList = [acNew1, acNew2];
    });


    it('it merges the new traffic into the traffic map', () => {
        expect(trafficMap.size).toBe(1);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.size).toBe(2);
    });


    it('it skips new traffic with only old positions', () => {
        trafficMap.clear();
        expect(trafficMap.size).toBe(0);
        pos1.position.timestamp = Timestamp.createFromSec(Timestamp.now().epochSec - TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC - 20);
        pos2.position.timestamp = Timestamp.createFromSec(Timestamp.now().epochSec - TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC - 10);
        acNew1.positions = [pos1, pos2];
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, [acNew1]);

        expect(newTrafficMap.size).toBe(0);
        expect(newTrafficMap.get(TrafficMerger.getTrafficMapKey(acNew1))).toBeUndefined();
    });


    it('it removes traffic without positions from the map', () => {
        acNew2.positions = [];
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.size).toBe(1);
        expect(newTrafficMap.get(TrafficMerger.getTrafficMapKey(acNew2))).toBeUndefined();
    });


    // TODO: take data source from last pos
    xit('should always overwrite data source', () => {
        acOld1.dataSource = TrafficDataSource.ADSBX;
        acNew1.dataSource = TrafficDataSource.OGN;
        // TrafficMerger.merge(acOld1, acNew1);
        expect(acOld1.dataSource).toBe(TrafficDataSource.OGN);
    });


    it('merges the ac type', () => {
        acOld1.acType = TrafficAircraftType.UNKNOWN;
        acNew1.acType = TrafficAircraftType.JET_AIRCRAFT;
        const key = TrafficMerger.getTrafficMapKey(acOld1);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.get(key).acType).toBe(TrafficAircraftType.JET_AIRCRAFT);
    });


    it('merges the icao type', () => {
        acOld1.icaoType = undefined;
        acNew1.icaoType = 'AAT3';
        const key = TrafficMerger.getTrafficMapKey(acOld1);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.get(key).icaoType).toBe('AAT3');
    });


    it('merges the registration', () => {
        acOld1.registration = '';
        acNew1.registration = 'HB-SRA';
        const key = TrafficMerger.getTrafficMapKey(acOld1);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.get(key).registration).toBe('HB-SRA');
    });


    it('merges the callsign', () => {
        acOld1.callsign = '';
        acNew1.callsign = 'SWR123';
        const key = TrafficMerger.getTrafficMapKey(acOld1);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.get(key).callsign).toBe('SWR123');
    });


    it('merges the op callsign', () => {
        acOld1.opCallsign = '';
        acNew1.opCallsign = 'Swiss 123';
        const key = TrafficMerger.getTrafficMapKey(acOld1);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.get(key).opCallsign).toBe('Swiss 123');
    });


    it('merges the ac model', () => {
        acOld1.acModel = '';
        acNew1.acModel = 'Airbus A319 111';
        const key = TrafficMerger.getTrafficMapKey(acOld1);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.get(key).acModel).toBe('Airbus A319 111');
    });
});
