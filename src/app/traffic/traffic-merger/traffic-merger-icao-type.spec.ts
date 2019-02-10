import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficMergerIcaoType} from './traffic-merger-icao-type';


describe('TrafficMergerIcaoType', () => {
    let acOld, acNew: Traffic;
    let icaoType: string;

    beforeEach(() => {
        acOld = new Traffic(
            '',
            TrafficAddressType.ICAO,
            TrafficDataSource.OGN,
            TrafficAircraftType.UNKNOWN,
            undefined,
            '',
            '',
            '',
            '',
            []);

        acNew = acOld.clone();
        acNew.dataSource = TrafficDataSource.OPENSKY;
    });


    it('should always overwrite undefined icao type', () => {
        acOld.icaoType = undefined;
        acNew.icaoType = 'AAT3';
        icaoType = TrafficMergerIcaoType.merge(acOld, acNew);
        expect(icaoType).toBe('AAT3');

        acOld.icaoType = '';
        acNew.icaoType = 'AAT3';
        icaoType = TrafficMergerIcaoType.merge(acOld, acNew);
        expect(icaoType).toBe('AAT3');
    });


    it('should never overwrite with undefined icao type', () => {
        acOld.icaoType = 'A320';
        acNew.icaoType = undefined;
        icaoType = TrafficMergerIcaoType.merge(acOld, acNew);
        expect(icaoType).toBe('A320');

        acOld.icaoType = 'A320';
        acNew.icaoType = '';
        icaoType = TrafficMergerIcaoType.merge(acOld, acNew);
        expect(icaoType).toBe('A320');
    });
});
