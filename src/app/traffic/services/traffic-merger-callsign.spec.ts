import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficMergerCallsign} from './traffic-merger-callsign';


describe('TrafficMergerCallsign', () => {
    let acOld, acNew: Traffic;
    let callsign: string;

    beforeEach(() => {
        acOld = new Traffic(
            '',
            TrafficAddressType.ICAO,
            TrafficDataSource.OGN,
            TrafficAircraftType.UNKNOWN,
            '',
            'EZS456',
            '',
            '',
            []);

        acNew = acOld.clone();
        acNew.dataSource = TrafficDataSource.OPENSKY;
    });


    it('should always overwrite empty callsign', () => {
        acOld.callsign = undefined;
        acNew.callsign = 'SWR123';
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe('SWR123');

        acOld.callsign = '';
        acNew.callsign = 'SWR123';
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe('SWR123');

        acOld.callsign = 'SWR123';
        acNew.callsign = undefined;
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe('SWR123');

        acOld.callsign = 'SWR123';
        acNew.callsign = '';
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe('SWR123');

        acOld.callsign = undefined;
        acNew.callsign = undefined;
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe(undefined);

        acOld.callsign = '';
        acNew.callsign = '';
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe('');
    });


    it('should overwrite callsign for source adsbX', () => {
        acOld.callsign = 'SWR123';
        acNew.callsign = 'EZS567';
        acNew.dataSource = TrafficDataSource.ADSBX;
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe('EZS567');
    });


    it('should not overwrite callsign for source ogn', () => {
        acOld.callsign = 'SWR123';
        acNew.callsign = 'EZS567';
        acNew.dataSource = TrafficDataSource.OGN;
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe('SWR123');
    });


    it('should overwrite callsign for source opensky', () => {
        acOld.callsign = 'SWR123';
        acNew.callsign = 'EZS567';
        acNew.dataSource = TrafficDataSource.OPENSKY;
        callsign = TrafficMergerCallsign.merge(acOld, acNew);
        expect(callsign).toBe('EZS567');
    });
});
