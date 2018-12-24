import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficMergerAcModel} from './traffic-merger-ac-model';


describe('TrafficMergerAcModel', () => {
    let acOld, acNew: Traffic;
    let reg: string;

    beforeEach(() => {
        acOld = new Traffic(
            '',
            TrafficAddressType.ICAO,
            TrafficDataSource.OGN,
            TrafficAircraftType.UNKNOWN,
            '',
            '',
            '',
            'Airbus A320 214',
            []);

        acNew = acOld.clone();
        acNew.dataSource = TrafficDataSource.OPENSKY;
    });


    it('should always overwrite empty registration', () => {
        acOld.acModel = undefined;
        acNew.acModel = 'Airbus A319 111';
        reg = TrafficMergerAcModel.merge(acOld, acNew);
        expect(reg).toBe('Airbus A319 111');

        acOld.acModel = '';
        acNew.acModel = 'Airbus A319 111';
        reg = TrafficMergerAcModel.merge(acOld, acNew);
        expect(reg).toBe('Airbus A319 111');

        acOld.acModel = 'Airbus A319 111';
        acNew.acModel = undefined;
        reg = TrafficMergerAcModel.merge(acOld, acNew);
        expect(reg).toBe('Airbus A319 111');

        acOld.acModel = 'Airbus A319 111';
        acNew.acModel = undefined;
        reg = TrafficMergerAcModel.merge(acOld, acNew);
        expect(reg).toBe('Airbus A319 111');
    });


    it('should overwrite registration for source adsbX', () => {
        acOld.acModel = 'Airbus A319 111';
        acNew.acModel = 'Boeing 777 300ER';
        acNew.dataSource = TrafficDataSource.ADSBX;
        reg = TrafficMergerAcModel.merge(acOld, acNew);
        expect(reg).toBe('Boeing 777 300ER');
    });


    it('should overwrite registration for source ogn', () => {
        acOld.acModel = 'Airbus A319 111';
        acNew.acModel = 'Boeing 777 300ER';
        acNew.dataSource = TrafficDataSource.OGN;
        reg = TrafficMergerAcModel.merge(acOld, acNew);
        expect(reg).toBe('Boeing 777 300ER');
    });


    it('should not overwrite registration for source opensky', () => {
        acOld.acModel = 'Airbus A319 111';
        acNew.acModel = 'Boeing 777 300ER';
        acNew.dataSource = TrafficDataSource.OPENSKY;
        reg = TrafficMergerAcModel.merge(acOld, acNew);
        expect(reg).toBe('Airbus A319 111');
    });
});
