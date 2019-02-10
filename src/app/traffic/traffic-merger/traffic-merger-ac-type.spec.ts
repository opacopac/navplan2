import {TrafficMergerAcType} from './traffic-merger-ac-type';
import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';


describe('TrafficMergerAcType', () => {
    let acOld, acNew: Traffic;
    let acType: TrafficAircraftType;

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


    it('should always overwrite unknown type', () => {
        acOld.acType = TrafficAircraftType.UNKNOWN;
        acNew.acType = TrafficAircraftType.POWERED_AIRCRAFT;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.POWERED_AIRCRAFT);

        acOld.acType = TrafficAircraftType.BALLOON;
        acNew.acType = TrafficAircraftType.UNKNOWN;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.BALLOON);

        acOld.acType = TrafficAircraftType.UNKNOWN;
        acNew.acType = TrafficAircraftType.UNKNOWN;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.UNKNOWN);
    });


    it('should always keep drop plane type', () => {
        acOld.acType = TrafficAircraftType.POWERED_AIRCRAFT;
        acNew.acType = TrafficAircraftType.DROP_PLANE;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.DROP_PLANE);

        acOld.acType = TrafficAircraftType.DROP_PLANE;
        acNew.acType = TrafficAircraftType.JET_AIRCRAFT;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.DROP_PLANE);

        acOld.acType = TrafficAircraftType.DROP_PLANE;
        acNew.acType = TrafficAircraftType.UNKNOWN;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.DROP_PLANE);
    });


    it('should overwrite plane type for source adsbX', () => {
        acOld.acType = TrafficAircraftType.POWERED_AIRCRAFT;
        acNew.acType = TrafficAircraftType.JET_AIRCRAFT;
        acNew.dataSource = TrafficDataSource.ADSBX;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.JET_AIRCRAFT);
    });


    it('should overwrite plane type for source ogn', () => {
        acOld.acType = TrafficAircraftType.POWERED_AIRCRAFT;
        acNew.acType = TrafficAircraftType.UAV;
        acNew.dataSource = TrafficDataSource.OGN;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.UAV);
    });


    it('should not overwrite plane type for source opensky', () => {
        acOld.acType = TrafficAircraftType.POWERED_AIRCRAFT;
        acNew.acType = TrafficAircraftType.JET_AIRCRAFT;
        acNew.dataSource = TrafficDataSource.OPENSKY;
        acType = TrafficMergerAcType.merge(acOld, acNew);
        expect(acType).toBe(TrafficAircraftType.POWERED_AIRCRAFT);
    });
});
