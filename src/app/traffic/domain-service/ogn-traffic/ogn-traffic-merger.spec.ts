import {Extent3d} from '../../../geo-math/domain-model/geometry/extent3d';
import {Traffic} from '../../domain-model/traffic';
import {AltitudeUnit} from '../../../geo-math/domain-model/geometry/altitude-unit';
import {Altitude} from '../../../geo-math/domain-model/geometry/altitude';
import {AltitudeReference} from '../../../geo-math/domain-model/geometry/altitude-reference';
import {MockDate} from '../../../system/domain-service/date/mock-date';
import {TrafficMap} from '../../domain-model/traffic-map';
import {Timestamp} from '../../../geo-math/domain-model/quantities/timestamp';
import {TrafficOgn} from '../../domain-model/traffic-ogn';
import {TrafficOgn1Mock} from '../../mocks/traffic-ogn1.mock';
import {OgnTrafficMerger} from './ogn-traffic-merger';
import {TrafficAircraftType} from '../../domain-model/traffic-aircraft-type';
import {TrafficState} from '../../domain-model/traffic-state';
import {initialTrafficState} from '../../ngrx/traffic.reducer';


describe('OgnTrafficMerger', () => {
    let mockDate: MockDate;
    let trafficMap: TrafficMap;
    let acOld: Traffic;
    let acNew: TrafficOgn;
    let key: string;
    let extent3d: Extent3d;
    let state: TrafficState;
    let ognTrafficMerger: OgnTrafficMerger;


    beforeEach(() => {
        mockDate = new MockDate();
        acOld = TrafficOgn1Mock.createTraffic();
        acNew = TrafficOgn1Mock.create();
        key = TrafficMap.getKey(acNew.address);
        trafficMap = new TrafficMap(mockDate);
        trafficMap.set(key, acOld);
        extent3d = new Extent3d(0.0, 0.0, new Altitude(0, AltitudeUnit.FT, AltitudeReference.MSL),
            100.0, 100.0, new Altitude(150000, AltitudeUnit.FT, AltitudeReference.MSL));
        state = { ...initialTrafficState, trafficMap: trafficMap, extent: extent3d };
        ognTrafficMerger = new OgnTrafficMerger(mockDate);
        mockDate.nowMsResult = acNew.positions[0].position.timestamp.epochMs;
    });


    it('merge creates a new entry to an empty traffic map', () => {
        trafficMap.clear();

        const newTrafficMap = ognTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key)).toEqual(TrafficOgn1Mock.createTraffic());
    });


    // region acType

    it('merge overwrites an unknown old acType with a known new acType', () => {
        acOld.acType = TrafficAircraftType.UNKNOWN;
        acNew.acType = TrafficAircraftType.POWERED_AIRCRAFT;

        const newTrafficMap = ognTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acType).toEqual(TrafficAircraftType.POWERED_AIRCRAFT);
    });


    it('merge doesnt overwrite a known old acType with an unknown new acType', () => {
        acOld.acType = TrafficAircraftType.POWERED_AIRCRAFT;
        acNew.acType = TrafficAircraftType.UNKNOWN;

        const newTrafficMap = ognTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acType).toEqual(TrafficAircraftType.POWERED_AIRCRAFT);
    });


    it('merge overwrites a known old acType with a known new acType', () => {
        acOld.acType = TrafficAircraftType.POWERED_AIRCRAFT;
        acNew.acType = TrafficAircraftType.DROP_PLANE;

        const newTrafficMap = ognTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).acType).toEqual(TrafficAircraftType.DROP_PLANE);
    });

    // endregion


    // region positions

    it('merge adds a new traffic position', () => {
        acNew.positions[0].receivedTimestamp = Timestamp.createFromSec(acNew.positions[0].receivedTimestamp.epochSec + 1);
        acNew.positions[0].position.timestamp = Timestamp.createFromSec(acNew.positions[0].position.timestamp.epochSec + 1);
        acNew.positions[0].position.latitude = acNew.positions[0].position.latitude + 0.01;
        mockDate.nowMsResult = TrafficOgn1Mock.createRestPos().timestamp;

        const newTrafficMap = ognTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).positions.length).toEqual(2);
    });

    // endregion
});
