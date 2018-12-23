import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../../model/traffic';
import {TrafficMergerOpCallsign} from './traffic-merger-op-callsign';


describe('TrafficMergerOpCallsign', () => {
    let acOld, acNew: Traffic;
    let opCallsign: string;

    beforeEach(() => {
        acOld = new Traffic(
            '',
            TrafficAddressType.ICAO,
            TrafficDataSource.OGN,
            TrafficAircraftType.UNKNOWN,
            '',
            '',
            'Topswiss 456',
            '',
            []);

        acNew = acOld.clone();
        acNew.dataSource = TrafficDataSource.OPENSKY;
    });


    it('should always overwrite empty op callsign', () => {
        acOld.opCallsign = undefined;
        acNew.opCallsign = 'Swiss 123';
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe('Swiss 123');

        acOld.opCallsign = '';
        acNew.opCallsign = 'Swiss 123';
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe('Swiss 123');

        acOld.opCallsign = 'Swiss 123';
        acNew.opCallsign = undefined;
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe('Swiss 123');

        acOld.opCallsign = 'Swiss 123';
        acNew.opCallsign = '';
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe('Swiss 123');

        acOld.opCallsign = undefined;
        acNew.opCallsign = undefined;
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe(undefined);

        acOld.opCallsign = '';
        acNew.opCallsign = '';
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe('');
    });


    it('should overwrite op callsign for source adsbX', () => {
        acOld.opCallsign = 'Swiss 123';
        acNew.opCallsign = 'Topswiss 567';
        acNew.dataSource = TrafficDataSource.ADSBX;
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe('Topswiss 567');
    });


    it('should not overwrite op callsign for source ogn', () => {
        acOld.opCallsign = 'Swiss 123';
        acNew.opCallsign = 'Topswiss 567';
        acNew.dataSource = TrafficDataSource.OGN;
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe('Swiss 123');
    });


    it('should not overwrite op callsign for source opensky', () => {
        acOld.opCallsign = 'Swiss 123';
        acNew.opCallsign = 'Topswiss 567';
        acNew.dataSource = TrafficDataSource.OPENSKY;
        opCallsign = TrafficMergerOpCallsign.merge(acOld, acNew);
        expect(opCallsign).toBe('Swiss 123');
    });
});
