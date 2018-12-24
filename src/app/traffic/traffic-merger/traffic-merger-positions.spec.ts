import {Traffic, TrafficDataSource} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {TrafficMergerPositions} from './traffic-merger-positions';
import {TrafficMock} from '../test/traffic-mock';


describe('TrafficMergerPositions', () => {
    let acOld, acNew: Traffic;
    let pos1, pos2, pos3, pos4, pos5: TrafficPosition;


    beforeEach(() => {
        const timSec = Timestamp.now().epochSec;
        pos1 = TrafficMock.createPosition(7.0, 47.0, timSec - 5);
        pos2 = TrafficMock.createPosition(7.1, 47.1, timSec - 4);
        pos3 = TrafficMock.createPosition(7.2, 47.2, timSec - 3);
        pos4 = TrafficMock.createPosition(7.3, 47.3, timSec - 2);
        pos5 = TrafficMock.createPosition(7.4, 47.4, timSec - 1);
        acOld = TrafficMock.MOCK_TRAFFIC_1;

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


    it('skips new positions with consecutive identical lat/lon', () => {
        pos4 = TrafficMock.createPosition(pos3.position.longitude, pos3.position.latitude);
        pos5 = TrafficMock.createPosition(pos3.position.longitude, pos3.position.latitude);
        acOld.positions = [pos1, pos2];
        acNew.positions = [pos3, pos4, pos5];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos4)).toBe(-1);
        expect(newPos.indexOf(pos5)).toBe(-1);
    });


    it('skips new positions with consecutive identical timestamps', () => {
        pos4 = TrafficMock.createPosition(7.4, 47.4, pos3.position.timestamp.epochSec);
        pos5 = TrafficMock.createPosition(7.5, 47.5, pos3.position.timestamp.epochSec);
        acOld.positions = [pos1, pos2];
        acNew.positions = [pos3, pos4, pos5];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos4)).toBe(-1);
        expect(newPos.indexOf(pos5)).toBe(-1);
    });


    it('skips a MLAT pos up to 30s after a ogn FLARM pos', () => {
        const nowSec = Timestamp.now().epochSec;
        pos1 = TrafficMock.createPosition(1, 1, nowSec - 1, TrafficDataSource.OGN, TrafficPositionMethod.FLARM);
        pos2 = TrafficMock.createPosition(2, 2, nowSec , TrafficDataSource.OGN, TrafficPositionMethod.FLARM);
        pos3 = TrafficMock.createPosition(3, 3, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC - 1, TrafficDataSource.OPENSKY, TrafficPositionMethod.MLAT);
        pos4 = TrafficMock.createPosition(4, 4, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC + 1, TrafficDataSource.OPENSKY, TrafficPositionMethod.MLAT);
        acOld.positions = [pos1];
        acNew.positions = [pos2, pos3, pos4];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos1)).toBe(0);
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(-1);
        expect(newPos.indexOf(pos4)).toBe(2);
    });


    it('skips a MLAT pos up to 30s after a opensky ADSB pos', () => {
        const nowSec = Timestamp.now().epochSec;
        pos1 = TrafficMock.createPosition(1, 1, nowSec - 1, TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB);
        pos2 = TrafficMock.createPosition(2, 2, nowSec , TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB);
        pos3 = TrafficMock.createPosition(3, 3, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC - 1, TrafficDataSource.ADSBX, TrafficPositionMethod.MLAT);
        pos4 = TrafficMock.createPosition(4, 4, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC + 1, TrafficDataSource.ADSBX, TrafficPositionMethod.MLAT);
        acOld.positions = [pos1];
        acNew.positions = [pos2, pos3, pos4];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos1)).toBe(0);
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(-1);
        expect(newPos.indexOf(pos4)).toBe(2);
    });


    it('skips a adsb-ex ADSB pos up to 30s after a ogn FLARM pos', () => {
        const nowSec = Timestamp.now().epochSec;
        pos1 = TrafficMock.createPosition(1, 1, nowSec - 1, TrafficDataSource.OGN, TrafficPositionMethod.FLARM);
        pos2 = TrafficMock.createPosition(2, 2, nowSec , TrafficDataSource.OGN, TrafficPositionMethod.FLARM);
        pos3 = TrafficMock.createPosition(3, 3, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC - 1, TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB);
        pos4 = TrafficMock.createPosition(4, 4, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC + 1, TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB);
        acOld.positions = [pos1];
        acNew.positions = [pos2, pos3, pos4];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos1)).toBe(0);
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(-1);
        expect(newPos.indexOf(pos4)).toBe(2);
    });


    it('skips a ADSB pos from adsb-ex up to 30s after a ADSB pos from opensky', () => {
        const nowSec = Timestamp.now().epochSec;
        pos1 = TrafficMock.createPosition(1, 1, nowSec - 1, TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB);
        pos2 = TrafficMock.createPosition(2, 2, nowSec , TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB);
        pos3 = TrafficMock.createPosition(3, 3, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC - 1, TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB);
        pos4 = TrafficMock.createPosition(4, 4, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC + 1, TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB);
        acOld.positions = [pos1];
        acNew.positions = [pos2, pos3, pos4];
        const newPos = TrafficMergerPositions.merge(acOld, acNew);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos1)).toBe(0);
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(-1);
        expect(newPos.indexOf(pos4)).toBe(2);
    });
});
