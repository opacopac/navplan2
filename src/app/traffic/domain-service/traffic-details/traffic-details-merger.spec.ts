import {Traffic} from '../../domain-model/traffic';
import {TrafficMap} from '../../domain-model/traffic-map';
import {TrafficAircraftType} from '../../domain-model/traffic-aircraft-type';
import {TrafficDetails1Mock} from '../../mocks/traffic-details1.mock';
import {TrafficDetails} from '../../domain-model/traffic-details';
import {TrafficDetailsMerger} from './traffic-details-merger';
import {MockDate} from '../../../system/domain-service/date/mock-date';
import {TrafficState} from '../../ngrx/traffic-state';
import {initialTrafficState} from '../../ngrx/traffic.reducer';
import {TrafficOgn1Mock} from '../../mocks/traffic-ogn1.mock';


describe('TrafficDetailsMerger', () => {
    let mockDate: MockDate;
    let trafficMap: TrafficMap;
    let acOld: Traffic;
    let acNew: TrafficDetails;
    let key: string;
    let state: TrafficState;


    beforeEach(() => {
        mockDate = new MockDate();
        acOld = TrafficDetails1Mock.createTraffic();
        acOld.positions = [TrafficOgn1Mock.createPos()];
        acNew = TrafficDetails1Mock.create();
        key = TrafficMap.getKey(acNew.address);
        trafficMap = new TrafficMap(mockDate);
        trafficMap.set(key, acOld);
        state = { ...initialTrafficState, trafficMap: trafficMap };
        mockDate.nowMsResult = acOld.positions[0].position.timestamp.epochMs;
    });


    it('merge sets the flag "isDetailsLoaded"', () => {
        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).isDetailsLoaded).toEqual(true);
    });


    // region acType

    it('merge overwrites an unknown old acType with a known new ac/eng class (prop)', () => {
        acOld.acType = TrafficAircraftType.UNKNOWN;
        acNew.acClass = 'L';
        acNew.engClass = 'P';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acType).toEqual(TrafficAircraftType.POWERED_AIRCRAFT);
    });


    it('merge overwrites an unknown old acType with a known new ac/eng class (jet)', () => {
        acOld.acType = TrafficAircraftType.UNKNOWN;
        acNew.acClass = 'L';
        acNew.engClass = 'J';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acType).toEqual(TrafficAircraftType.JET_AIRCRAFT);
    });


    it('merge overwrites an unknown old acType with a known new ac/eng class (heli)', () => {
        acOld.acType = TrafficAircraftType.UNKNOWN;
        acNew.acClass = 'H';
        acNew.engClass = 'J';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acType).toEqual(TrafficAircraftType.HELICOPTER_ROTORCRAFT);
    });


    it('merge doesnt overwrite a known old acType with known new ac/eng class', () => {
        acOld.acType = TrafficAircraftType.POWERED_AIRCRAFT;
        acNew.acClass = 'H';
        acNew.engClass = 'J';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acType).toEqual(TrafficAircraftType.POWERED_AIRCRAFT);
    });

    // endregion


    // region acIcao

    it('merge overwrites an emtpy old acIcao with a non-empty new acIcao', () => {
        acOld.acIcao = undefined;
        acNew.icaoType = 'C172';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acIcao).toEqual('C172');
    });


    it('merge doesnt overwrite a non-emtpy old acIcao with an empty new acIcao', () => {
        acOld.acIcao = 'C172';
        acNew.icaoType = undefined;

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acIcao).toEqual('C172');
    });


    it('merge overwrites a non-emtpy old acIcao with a non-empty new acIcao', () => {
        acOld.acIcao = 'AAT3';
        acNew.icaoType = 'C172';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acIcao).toEqual('C172');
    });

    // endregion


    // region registration

    it('merge overwrites an emtpy old registration with a non-empty new registration', () => {
        acOld.registration = undefined;
        acNew.registration = 'HB-SRA';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).registration).toEqual('HB-SRA');
    });


    it('merge doesnt overwrite a non-emtpy old registration with an empty new registration', () => {
        acOld.registration = 'HB-SRA';
        acNew.registration = undefined;

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).registration).toEqual('HB-SRA');
    });


    it('merge overwrites a non-emtpy old registration with a non-empty new registration', () => {
        acOld.registration = 'HB-SRA';
        acNew.registration = 'HB-SRD';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).registration).toEqual('HB-SRD');
    });

    // endregion


    // region model

    it('merge overwrites an emtpy old model with a non-empty new model', () => {
        acOld.model = undefined;
        acNew.model = 'AT-3 R100';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).model).toEqual('AT-3 R100');
    });


    it('merge doesnt overwrite a non-emtpy old model with an empty new model', () => {
        acOld.model = 'AT-3 R100';
        acNew.model = undefined;

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).model).toEqual('AT-3 R100');
    });


    it('merge overwrites a non-emtpy old model with a non-empty new model', () => {
        acOld.model = 'Airbus A320';
        acNew.model = 'AT-3 R100';

        const newTrafficMap = TrafficDetailsMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).model).toEqual('AT-3 R100');
    });

    // endregion
});
