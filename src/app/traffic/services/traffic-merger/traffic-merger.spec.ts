import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../../model/traffic';
import {TrafficMerger} from './traffic-merger';


describe('TrafficMerger', () => {
    let ac, acNew: Traffic;

    beforeEach(() => {
        ac = new Traffic(
            '8964A3',
            TrafficAddressType.ICAO,
            TrafficDataSource.OGN,
            TrafficAircraftType.UNKNOWN,
            '',
            '',
            '',
            '',
            []);

        acNew = ac.clone();
        acNew.dataSource = TrafficDataSource.OPENSKY;
    });


    it('should always overwrite ac address', () => {
        ac.acAddress = '99AABB';
        acNew.acAddress = 'C0FFEE';
        TrafficMerger.merge(ac, acNew);
        expect(ac.acAddress).toBe('C0FFEE');
    });


    it('should always overwrite address type', () => {
        ac.addressType = TrafficAddressType.ICAO;
        acNew.addressType = TrafficAddressType.OGN;
        TrafficMerger.merge(ac, acNew);
        expect(ac.addressType).toBe(TrafficAddressType.OGN);
    });


    it('should always overwrite data source', () => {
        ac.dataSource = TrafficDataSource.ADSBX;
        acNew.dataSource = TrafficDataSource.OGN;
        TrafficMerger.merge(ac, acNew);
        expect(ac.dataSource).toBe(TrafficDataSource.OGN);
    });


    it('merges the ac type', () => {
        ac.acType = TrafficAircraftType.UNKNOWN;
        acNew.acType = TrafficAircraftType.JET_AIRCRAFT;
        TrafficMerger.merge(ac, acNew);
        expect(ac.acType).toBe(TrafficAircraftType.JET_AIRCRAFT);
    });


    it('merges the registration', () => {
        ac.registration = '';
        acNew.registration = 'HB-SRA';
        TrafficMerger.merge(ac, acNew);
        expect(ac.registration).toBe('HB-SRA');
    });


    it('merges the callsign', () => {
        ac.callsign = '';
        acNew.callsign = 'SWR123';
        TrafficMerger.merge(ac, acNew);
        expect(ac.callsign).toBe('SWR123');
    });


    it('merges the op callsign', () => {
        ac.callsign = '';
        acNew.callsign = 'Swiss 123';
        TrafficMerger.merge(ac, acNew);
        expect(ac.callsign).toBe('Swiss 123');
    });

    it('merges the ac model', () => {
        ac.callsign = '';
        acNew.callsign = 'Airbus A319 111';
        TrafficMerger.merge(ac, acNew);
        expect(ac.callsign).toBe('Airbus A319 111');
    });
});
