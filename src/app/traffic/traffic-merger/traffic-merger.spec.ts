import {Traffic, TrafficAircraftType, TrafficDataSource} from '../domain/traffic';
import {TrafficPosition} from '../domain/traffic-position';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {TrafficMerger} from './traffic-merger';
import {TrafficMock} from '../test/traffic-mock';
import {TrafficMergerPositions} from './traffic-merger-positions';
import {Length} from '../../shared/model/quantities/length';
import {LengthUnit} from '../../shared/model/quantities/units';
import {Extent3d} from '../../shared/model/geometry/extent3d';


describe('TrafficMerger', () => {
    let pos1, pos2, pos3: TrafficPosition;
    let ac1Old, ac1New, ac2New: Traffic;
    let trafficMap: Map<string, Traffic>;
    let newTrafficList: Traffic[];
    let extent: Extent3d;


    beforeEach(() => {
        const timSec = Timestamp.now().epochSec;
        pos1 = TrafficMock.createPosition(7.0, 47.0, timSec - 3);
        pos2 = TrafficMock.createPosition(7.1, 47.1, timSec - 2);
        pos3 = TrafficMock.createPosition(7.2, 47.2, timSec - 1);
        ac1Old = TrafficMock.MOCK_TRAFFIC_1.clone();
        ac1Old.acAddress = 'AAAAAA';
        ac1Old.positions = [pos1, pos2];
        ac1New = ac1Old.clone();
        ac1New.acAddress = 'AAAAAA';
        ac1New.positions = [pos3];
        ac2New = ac1Old.clone();
        ac2New.acAddress = 'BBBBBB';
        trafficMap = new Map<string, Traffic>();
        trafficMap.set(TrafficMerger.getTrafficMapKey(ac1Old), ac1Old);
        newTrafficList = [ac1New, ac2New];
        extent = new Extent3d(
            7.0,
            47.0,
            new Length(0, LengthUnit.FT),
            8.0,
            48.0,
            new Length(15000, LengthUnit.FT),
        );
    });


    // region getTrafficMapKey

    it('creates a lookup key from an traffic object', () => {
        const ac = TrafficMock.MOCK_TRAFFIC_1.clone();
        const expectedKey = ac.addressType + '_' + ac.acAddress;
        const actualKey = TrafficMerger.getTrafficMapKey(ac);

        expect(actualKey).toEqual(expectedKey);
    });

    // endregion


    // region mergeTrafficMap

    it('it merges the new traffic into the traffic map', () => {
        expect(trafficMap.size).toBe(1);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.size).toBe(2);
    });


    it('it skips new traffic with only old positions', () => {
        trafficMap.clear();
        expect(trafficMap.size).toBe(0);
        pos1.position.timestamp = Timestamp.createFromSec(Timestamp.now().epochSec - TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC - 20);
        pos2.position.timestamp = Timestamp.createFromSec(Timestamp.now().epochSec - TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC - 10);
        ac1New.positions = [pos1, pos2];
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, [ac1New], extent);

        expect(newTrafficMap.size).toBe(0);
        expect(newTrafficMap.get(TrafficMerger.getTrafficMapKey(ac1New))).toBeUndefined();
    });


    it('it removes traffic without positions from the map', () => {
        ac2New.positions = [];
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.size).toBe(1);
        expect(newTrafficMap.get(TrafficMerger.getTrafficMapKey(ac2New))).toBeUndefined();
    });


    it('it removes traffic with only old positions from the map', () => {
        const oldPos = TrafficMock.createPosition(7.0, 47.0, Timestamp.createFromRelSec( -TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC - 1).epochSec);
        ac1Old.positions = [oldPos];
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, [], extent);

        expect(newTrafficMap.size).toBe(0);
        expect(newTrafficMap.get(TrafficMerger.getTrafficMapKey(ac1Old))).toBeUndefined();
    });


    // TODO: take data source from last pos
    xit('should always overwrite data source', () => {
        ac1Old.dataSource = TrafficDataSource.ADSBX;
        ac1New.dataSource = TrafficDataSource.OGN;
        // TrafficMerger.merge(acOld1, acNew1);
        expect(ac1Old.dataSource).toBe(TrafficDataSource.OGN);
    });


    it('merges the ac type', () => {
        ac1Old.acType = TrafficAircraftType.UNKNOWN;
        ac1New.acType = TrafficAircraftType.JET_AIRCRAFT;
        const key = TrafficMerger.getTrafficMapKey(ac1Old);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.get(key).acType).toBe(TrafficAircraftType.JET_AIRCRAFT);
    });


    it('merges the icao type', () => {
        ac1Old.icaoType = undefined;
        ac1New.icaoType = 'AAT3';
        const key = TrafficMerger.getTrafficMapKey(ac1Old);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.get(key).icaoType).toBe('AAT3');
    });


    it('merges the registration', () => {
        ac1Old.registration = '';
        ac1New.registration = 'HB-SRA';
        const key = TrafficMerger.getTrafficMapKey(ac1Old);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.get(key).registration).toBe('HB-SRA');
    });


    it('merges the callsign', () => {
        ac1Old.callsign = '';
        ac1New.callsign = 'SWR123';
        const key = TrafficMerger.getTrafficMapKey(ac1Old);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.get(key).callsign).toBe('SWR123');
    });


    it('merges the op callsign', () => {
        ac1Old.opCallsign = '';
        ac1New.opCallsign = 'Swiss 123';
        const key = TrafficMerger.getTrafficMapKey(ac1Old);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.get(key).opCallsign).toBe('Swiss 123');
    });


    it('merges the ac model', () => {
        ac1Old.acModel = '';
        ac1New.acModel = 'Airbus A319 111';
        const key = TrafficMerger.getTrafficMapKey(ac1Old);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.get(key).acModel).toBe('Airbus A319 111');
    });


    it('merges traffic details', () => {
        ac1Old.dataSource = TrafficDataSource.ADSBX;
        ac1Old.acModel = '';
        ac1New.dataSource = TrafficDataSource.DETAILS;
        ac1New.acModel = 'AAT3';
        ac1New.positions = [];
        const key1 = TrafficMerger.getTrafficMapKey(ac1Old);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.get(key1).isDetailsLoaded).toBeTruthy();
        expect(newTrafficMap.get(key1).acModel).toEqual('AAT3');
    });


    it('sets the details loaded flag', () => {
        ac1Old.dataSource = TrafficDataSource.ADSBX;
        ac1New.dataSource = TrafficDataSource.DETAILS;
        ac2New.dataSource = TrafficDataSource.OGN;
        const key1 = TrafficMerger.getTrafficMapKey(ac1Old);
        const key2 = TrafficMerger.getTrafficMapKey(ac2New);
        const newTrafficMap = TrafficMerger.mergeTrafficMap(trafficMap, newTrafficList, extent);

        expect(newTrafficMap.get(key1).isDetailsLoaded).toBeTruthy();
        expect(newTrafficMap.get(key2).isDetailsLoaded).toBeFalsy();
    });


    it('filters traffic by extent', () => {
        const acTooWest = ac1New.clone();
        acTooWest.positions[0].position.longitude = 2.0;
        const acTooHigh = ac1New.clone();
        acTooWest.positions[0].position.altitude = new Length(16000, LengthUnit.FT);
        const emptyTrafficMap = new Map<string, Traffic>();
        const newTrafficMap = TrafficMerger.mergeTrafficMap(emptyTrafficMap, [acTooWest, acTooHigh], extent);

        expect(newTrafficMap.size).toBe(0);
    });

    // endregion
});
