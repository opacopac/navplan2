import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficMergerRegistration} from './traffic-merger-registration';


describe('TrafficMergerRegistration', () => {
    let acOld, acNew: Traffic;
    let reg: string;

    beforeEach(() => {
        acOld = new Traffic(
            '',
            TrafficAddressType.ICAO,
            TrafficDataSource.OGN,
            TrafficAircraftType.UNKNOWN,
            undefined,
            'HB-SRA',
            '',
            '',
            '',
            []);

        acNew = acOld.clone();
        acNew.dataSource = TrafficDataSource.OPENSKY;
    });


    it('should always overwrite empty registration', () => {
        acOld.registration = undefined;
        acNew.registration = 'HB-SRA';
        reg = TrafficMergerRegistration.merge(acOld, acNew);
        expect(reg).toBe('HB-SRA');

        acOld.registration = '';
        acNew.registration = 'HB-SRA';
        reg = TrafficMergerRegistration.merge(acOld, acNew);
        expect(reg).toBe('HB-SRA');

        acOld.registration = 'HB-SRA';
        acNew.registration = undefined;
        reg = TrafficMergerRegistration.merge(acOld, acNew);
        expect(reg).toBe('HB-SRA');

        acOld.registration = 'HB-SRA';
        acNew.registration = undefined;
        reg = TrafficMergerRegistration.merge(acOld, acNew);
        expect(reg).toBe('HB-SRA');
    });


    it('should overwrite registration for source adsbX', () => {
        acOld.registration = 'HB-SRA';
        acNew.registration = 'HB-SRB';
        acNew.dataSource = TrafficDataSource.ADSBX;
        reg = TrafficMergerRegistration.merge(acOld, acNew);
        expect(reg).toBe('HB-SRB');
    });


    it('should overwrite registration for source ogn', () => {
        acOld.registration = 'HB-SRA';
        acNew.registration = 'HB-SRB';
        acNew.dataSource = TrafficDataSource.OGN;
        reg = TrafficMergerRegistration.merge(acOld, acNew);
        expect(reg).toBe('HB-SRB');
    });


    it('should not overwrite registration for source opensky', () => {
        acOld.registration = 'HB-SRA';
        acNew.registration = 'HB-SRB';
        acNew.dataSource = TrafficDataSource.OPENSKY;
        reg = TrafficMergerRegistration.merge(acOld, acNew);
        expect(reg).toBe('HB-SRA');
    });
});
