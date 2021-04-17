import {Extent3d} from '../../../geo-math/domain-model/geometry/extent3d';
import {AdsbexTrafficMerger} from './adsbex-traffic-merger';
import {Traffic} from '../../domain-model/traffic';
import {AltitudeUnit} from '../../../geo-math/domain-model/geometry/altitude-unit';
import {Altitude} from '../../../geo-math/domain-model/geometry/altitude';
import {AltitudeReference} from '../../../geo-math/domain-model/geometry/altitude-reference';
import {TrafficAdsbex1Mock} from '../../mocks/traffic-adsbex1.mock';
import {MockDate} from '../../../system/domain-service/date/mock-date';
import {TrafficMap} from '../../domain-model/traffic-map';
import {TrafficAdsbex} from '../../domain-model/traffic-adsbex';
import {Timestamp} from '../../../geo-math/domain-model/quantities/timestamp';
import {initialTrafficState} from '../../ngrx/traffic.reducer';
import {TrafficState} from '../../domain-model/traffic-state';


describe('AdsbexTrafficMerger', () => {
    let mockDate: MockDate;
    let trafficMap: TrafficMap;
    let acOld: Traffic;
    let acNew: TrafficAdsbex;
    let key: string;
    let extent3d: Extent3d;
    let state: TrafficState;
    let adsbexTrafficMerger: AdsbexTrafficMerger;


    beforeEach(() => {
        mockDate = new MockDate();
        acOld = TrafficAdsbex1Mock.createTraffic();
        acNew = TrafficAdsbex1Mock.create();
        key = TrafficMap.getKey(acNew.address);
        trafficMap = new TrafficMap(mockDate);
        trafficMap.set(key, acOld);
        extent3d = new Extent3d(0.0, 0.0, new Altitude(0, AltitudeUnit.FT, AltitudeReference.MSL),
            100.0, 100.0, new Altitude(150000, AltitudeUnit.FT, AltitudeReference.MSL));
        state = { ...initialTrafficState, trafficMap: trafficMap, extent: extent3d };
        adsbexTrafficMerger = new AdsbexTrafficMerger(mockDate);
        mockDate.nowMsResult = acNew.positions[0].position.timestamp.epochMs;
    });


    it('merge creates a new entry to an empty traffic map', () => {
        trafficMap.clear();

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key)).toEqual(TrafficAdsbex1Mock.createTraffic());
    });


    // region acIcao

    it('merge overwrites an emtpy old acIcao with a non-empty new acIcao', () => {
        acOld.acIcao = undefined;
        acNew.icaoType = 'C172';

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acIcao).toEqual('C172');
    });


    it('merge doesnt overwrite a non-emtpy old acIcao with an empty new acIcao', () => {
        acOld.acIcao = 'C172';
        acNew.icaoType = undefined;

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acIcao).toEqual('C172');
    });


    it('merge overwrites a non-emtpy old acIcao with a non-empty new acIcao', () => {
        acOld.acIcao = 'AAT3';
        acNew.icaoType = 'C172';

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acIcao).toEqual('C172');
    });

    // endregion


    // region registration

    it('merge overwrites an emtpy old registration with a non-empty new registration', () => {
        acOld.registration = undefined;
        acNew.registration = 'HB-SRA';

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).registration).toEqual('HB-SRA');
    });


    it('merge doesnt overwrite a non-emtpy old registration with an empty new registration', () => {
        acOld.registration = 'HB-SRA';
        acNew.registration = undefined;

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).registration).toEqual('HB-SRA');
    });


    it('merge overwrites a non-emtpy old registration with a non-empty new registration', () => {
        acOld.registration = 'HB-SRA';
        acNew.registration = 'HB-SRD';

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).registration).toEqual('HB-SRD');
    });

    // endregion


    // region callsign

    it('merge overwrites an emtpy old callsign with a non-empty new callsign', () => {
        acOld.callsign = undefined;
        acNew.callsign = 'SWR123';

        const newTrafficMap =  adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).callsign).toEqual('SWR123');
    });


    it('merge doesnt overwrite a non-emtpy old callsign with an empty new callsign', () => {
        acOld.callsign = 'SWR123';
        acNew.callsign = undefined;

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).callsign).toEqual('SWR123');
    });


    it('merge overwrites a non-emtpy old callsign with a non-empty new callsign', () => {
        acOld.callsign = 'SWR123';
        acNew.callsign = 'SWR321';

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).callsign).toEqual('SWR321');
    });

    // endregion


    // region positions

    it('merge adds a new traffic position', () => {
        acNew.positions[0].receivedTimestamp = Timestamp.createFromSec(acNew.positions[0].receivedTimestamp.epochSec + 1);
        acNew.positions[0].position.timestamp = Timestamp.createFromSec(acNew.positions[0].position.timestamp.epochSec + 1);
        acNew.positions[0].position.latitude = acNew.positions[0].position.latitude + 0.01;
        mockDate.nowMsResult = TrafficAdsbex1Mock.createRestPos().timestamp;

        const newTrafficMap = adsbexTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).positions.length).toEqual(2);
    });

    // endregion
});
