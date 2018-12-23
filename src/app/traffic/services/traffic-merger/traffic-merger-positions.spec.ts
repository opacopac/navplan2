import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../../model/traffic-position';
import {Position4d} from '../../../shared/model/geometry/position4d';
import {Altitude} from '../../../shared/model/quantities/altitude';
import {LengthUnit} from '../../../shared/model/units';
import {Timestamp} from '../../../shared/model/quantities/timestamp';
import {TrafficMergerPositions} from './traffic-merger-positions';


describe('TrafficMergerPositions', () => {
    let acOld, acNew: Traffic;
    let pos1, pos2, pos3: TrafficPosition;


    function createPos(lon: number, lat: number, timestampSec?: number): TrafficPosition {
        const timestamp = timestampSec ? new Timestamp(timestampSec) : Timestamp.now();
        return new TrafficPosition(
            new Position4d(lon, lat, new Altitude(2000, LengthUnit.FT), timestamp),
            TrafficPositionMethod.ADSB,
            'rec123',
            timestamp.getMs()
        );
    }


    beforeEach(() => {
        const timSec = Timestamp.now().epochSec;
        pos1 = createPos(7.0, 47.0, timSec - 3);
        pos2 = createPos(7.1, 47.1, timSec - 2);
        pos3 = createPos(7.2, 47.2, timSec - 1);
        acOld = new Traffic(
            '',
            TrafficAddressType.ICAO,
            TrafficDataSource.OGN,
            TrafficAircraftType.UNKNOWN,
            '',
            '',
            'Topswiss 456',
            '',
            [pos1, pos2]);

        acNew = acOld.clone();
        acNew.dataSource = TrafficDataSource.OPENSKY;
    });


    it('adds a new pos to the end of the position list', () => {
        acOld.positions = [pos1, pos2];
        acNew.positions = [pos3];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos3)).toBe(2); // 0-based
    });


    it('inserts an older pos into the list ordered by its timestamp', () => {
        acOld.positions = [pos1, pos3];
        acNew.positions = [pos2];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.indexOf(pos1)).toBe(0); // 0-based
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(2);
    });


    it('removes expired positions from the list', () => {
        const expTimeSec = Timestamp.now().epochSec - TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC;
        pos1.position.timestamp = new Timestamp(expTimeSec - 100);
        pos2.position.timestamp = Timestamp.now();
        pos3.position.timestamp = new Timestamp(expTimeSec - 1);
        acOld.positions = [pos1, pos3];
        acNew.positions = [pos2];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(1);
        expect(newPos[0]).toBe(pos2);
    });


    it('skips a new pos with an identical lat/lon already in the list', () => {
        const pos4 = createPos(pos2.position.longitude, pos2.position.latitude);
        const pos5 = createPos(pos3.position.longitude, pos3.position.latitude);
        acOld.positions = [pos1, pos2];
        acNew.positions = [pos3, pos4, pos5];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos4)).toBe(-1);
        expect(newPos.indexOf(pos5)).toBe(-1);
    });


    it('skips a new pos with an identical timestamp already in the list', () => {
        const pos4 = createPos(7.4, 47.4, pos2.position.timestamp.epochSec);
        const pos5 = createPos(7.5, 47.5, pos3.position.timestamp.epochSec);
        acOld.positions = [pos1, pos2];
        acNew.positions = [pos3, pos4, pos5];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos4)).toBe(-1);
        expect(newPos.indexOf(pos5)).toBe(-1);
    });
});
