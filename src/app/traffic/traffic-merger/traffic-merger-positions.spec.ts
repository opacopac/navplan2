import {Traffic, TrafficDataSource} from '../domain/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../domain/traffic-position';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {TrafficMergerPositions} from './traffic-merger-positions';
import {TrafficMock} from '../test/traffic-mock';
import {Extent4d} from '../../shared/model/geometry/extent4d';
import {Length} from '../../shared/model/quantities/length';
import {LengthUnit} from '../../shared/model/quantities/units';


describe('TrafficMergerPositions', () => {
    let acOld, acNew: Traffic;
    let pos1, pos2, pos3, pos4, pos5: TrafficPosition;
    let extent: Extent4d;


    beforeEach(() => {
        const timSec = Timestamp.now().epochSec;
        pos1 = TrafficMock.createPosition(7.0, 47.0, timSec - 5);
        pos2 = TrafficMock.createPosition(7.1, 47.1, timSec - 4);
        pos3 = TrafficMock.createPosition(7.2, 47.2, timSec - 3);
        pos4 = TrafficMock.createPosition(7.3, 47.3, timSec - 2);
        pos5 = TrafficMock.createPosition(7.4, 47.4, timSec - 1);
        acOld = TrafficMock.MOCK_TRAFFIC_1.clone();

        acNew = acOld.clone();
        acNew.dataSource = TrafficDataSource.OPENSKY;

        extent = new Extent4d(
            7.0,
            47.0,
            new Length(0, LengthUnit.FT),
            Timestamp.createFromRelSec(-120),
            8.0,
            48.0,
            new Length(15000, LengthUnit.FT),
            Timestamp.now()
        );
    });


    it('adds a new pos to the end of the position list', () => {
        acOld.positions = [pos1, pos2];
        acNew.positions = [pos3];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos3)).toBe(2); // 0-based
    });


    it('inserts an older pos into the list ordered by its timestamp', () => {
        acOld.positions = [pos1, pos3];
        acNew.positions = [pos2];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.indexOf(pos1)).toBe(0); // 0-based
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(2);
    });


    it('removes expired positions from the list', () => {
        const expTimeSec = Timestamp.now().epochSec - TrafficMergerPositions.TRAFFIC_MAX_AGE_SEC;
        pos1.position.timestamp = Timestamp.createFromSec(expTimeSec - 100);
        pos2.position.timestamp = Timestamp.now();
        pos3.position.timestamp = Timestamp.createFromSec(expTimeSec - 1);
        acOld.positions = [pos1, pos3];
        acNew.positions = [pos2];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.length).toBe(1);
        expect(newPos[0]).toBe(pos2);
    });


    it('skips new positions with consecutive identical lat/lon', () => {
        pos4 = TrafficMock.createPosition(pos3.position.longitude, pos3.position.latitude);
        pos5 = TrafficMock.createPosition(pos3.position.longitude, pos3.position.latitude);
        acOld.positions = [pos1, pos2];
        acNew.positions = [pos3, pos4, pos5];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos4)).toBe(-1);
        expect(newPos.indexOf(pos5)).toBe(-1);
    });


    it('skips new positions with consecutive identical timestamps', () => {
        pos4 = TrafficMock.createPosition(7.4, 47.4, pos3.position.timestamp.epochSec);
        pos5 = TrafficMock.createPosition(7.5, 47.5, pos3.position.timestamp.epochSec);
        acOld.positions = [pos1, pos2];
        acNew.positions = [pos3, pos4, pos5];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos4)).toBe(-1);
        expect(newPos.indexOf(pos5)).toBe(-1);
    });


    it('skips a MLAT pos up to 30s after a ogn FLARM pos', () => {
        const nowSec = Timestamp.now().epochSec - 60;
        pos1 = TrafficMock.createPosition(7.0, 47.0, nowSec - 1, TrafficDataSource.OGN, TrafficPositionMethod.FLARM);
        pos2 = TrafficMock.createPosition(7.1, 47.1, nowSec , TrafficDataSource.OGN, TrafficPositionMethod.FLARM);
        pos3 = TrafficMock.createPosition(7.2, 47.2, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC - 1, TrafficDataSource.OPENSKY, TrafficPositionMethod.MLAT);
        pos4 = TrafficMock.createPosition(7.3, 47.3, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC + 1, TrafficDataSource.OPENSKY, TrafficPositionMethod.MLAT);
        acOld.positions = [pos1];
        acNew.positions = [pos2, pos3, pos4];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos1)).toBe(0);
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(-1);
        expect(newPos.indexOf(pos4)).toBe(2);
    });


    it('skips a MLAT pos up to 30s after a opensky ADSB pos', () => {
        const nowSec = Timestamp.now().epochSec - 60;
        pos1 = TrafficMock.createPosition(7.0, 47.0, nowSec - 1, TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB);
        pos2 = TrafficMock.createPosition(7.1, 47.1, nowSec , TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB);
        pos3 = TrafficMock.createPosition(7.2, 47.2, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC - 1, TrafficDataSource.ADSBX, TrafficPositionMethod.MLAT);
        pos4 = TrafficMock.createPosition(7.3, 47.3, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC + 1, TrafficDataSource.ADSBX, TrafficPositionMethod.MLAT);
        acOld.positions = [pos1];
        acNew.positions = [pos2, pos3, pos4];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos1)).toBe(0);
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(-1);
        expect(newPos.indexOf(pos4)).toBe(2);
    });


    it('skips a adsb-ex ADSB pos up to 30s after a ogn FLARM pos', () => {
        const nowSec = Timestamp.now().epochSec - 60;
        pos1 = TrafficMock.createPosition(7.0, 47.0, nowSec - 1, TrafficDataSource.OGN, TrafficPositionMethod.FLARM);
        pos2 = TrafficMock.createPosition(7.1, 47.1, nowSec , TrafficDataSource.OGN, TrafficPositionMethod.FLARM);
        pos3 = TrafficMock.createPosition(7.2, 47.2, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC - 1, TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB);
        pos4 = TrafficMock.createPosition(7.3, 47.3, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC + 1, TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB);
        acOld.positions = [pos1];
        acNew.positions = [pos2, pos3, pos4];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos1)).toBe(0);
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(-1);
        expect(newPos.indexOf(pos4)).toBe(2);
    });


    it('skips a ADSB pos from adsb-ex up to 30s after a ADSB pos from opensky', () => {
        const nowSec = Timestamp.now().epochSec - 60;
        pos1 = TrafficMock.createPosition(7.0, 47.0, nowSec - 1, TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB);
        pos2 = TrafficMock.createPosition(7.1, 47.1, nowSec , TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB);
        pos3 = TrafficMock.createPosition(7.2, 47.2, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC - 1, TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB);
        pos4 = TrafficMock.createPosition(7.3, 47.3, nowSec + TrafficMergerPositions.INFERIOR_TRAFFIC_DELAY_SEC + 1, TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB);
        acOld.positions = [pos1];
        acNew.positions = [pos2, pos3, pos4];
        const newPos = TrafficMergerPositions.merge(acOld, acNew, extent);

        expect(newPos.length).toBe(3);
        expect(newPos.indexOf(pos1)).toBe(0);
        expect(newPos.indexOf(pos2)).toBe(1);
        expect(newPos.indexOf(pos3)).toBe(-1);
        expect(newPos.indexOf(pos4)).toBe(2);
    });


    it('filters positions by extent', () => {
        const acTooWest = acNew.clone();
        acTooWest.positions = [pos1.clone(), pos2.clone()];
        acTooWest.positions[0].position.longitude = 2.0;
        const acTooHigh = acNew.clone();
        acTooHigh.positions = [pos1.clone(), pos2.clone()];
        acTooHigh.positions[1].position.altitude = new Length(16000, LengthUnit.FT);
        const newPosList1 = TrafficMergerPositions.merge(acOld, acTooWest, extent);
        const newPosList2 = TrafficMergerPositions.merge(acOld, acTooHigh, extent);

        expect(newPosList1.length).toBe(1);
        expect(newPosList2.length).toBe(1);
    });
});
