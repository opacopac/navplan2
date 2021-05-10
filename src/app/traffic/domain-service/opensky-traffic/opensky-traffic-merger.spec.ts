import {Extent3d} from '../../../common/geo-math/domain-model/geometry/extent3d';
import {Traffic} from '../../domain-model/traffic';
import {AltitudeUnit} from '../../../common/geo-math/domain-model/geometry/altitude-unit';
import {Altitude} from '../../../common/geo-math/domain-model/geometry/altitude';
import {AltitudeReference} from '../../../common/geo-math/domain-model/geometry/altitude-reference';
import {MockDate} from '../../../system/domain-service/date/mock-date';
import {TrafficMap} from '../../domain-model/traffic-map';
import {Timestamp} from '../../../common/geo-math/domain-model/quantities/timestamp';
import {OpenskyTraffic} from '../../domain-model/opensky-traffic';
import {TrafficOpensky1Mock} from '../../mocks/traffic-opensky1.mock';
import {OpenskyTrafficMerger} from './opensky-traffic-merger';
import {initialTrafficState} from '../../ngrx/traffic.reducer';
import {TrafficState} from '../../ngrx/traffic-state';


describe('OpenskyTrafficMerger', () => {
    let mockDate: MockDate;
    let trafficMap: TrafficMap;
    let acOld: Traffic;
    let acNew: OpenskyTraffic;
    let key: string;
    let extent3d: Extent3d;
    let state: TrafficState;
    let openskyTrafficMerger: OpenskyTrafficMerger;


    beforeEach(() => {
        mockDate = new MockDate();
        acOld = TrafficOpensky1Mock.createTraffic();
        acNew = TrafficOpensky1Mock.create();
        key = TrafficMap.getKey(acNew.address);
        trafficMap = new TrafficMap(mockDate);
        trafficMap.set(key, acOld);
        extent3d = new Extent3d(0.0, 0.0, new Altitude(0, AltitudeUnit.FT, AltitudeReference.MSL),
            100.0, 100.0, new Altitude(150000, AltitudeUnit.FT, AltitudeReference.MSL));
        state = { ...initialTrafficState, trafficMap: trafficMap, extent: extent3d };
        openskyTrafficMerger = new OpenskyTrafficMerger(mockDate);
        mockDate.nowMsResult = acNew.positions[0].position.timestamp.epochMs;
    });


    it('merge creates a new entry to an empty traffic map', () => {
        trafficMap.clear();

        const newTrafficMap = openskyTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key)).toEqual(TrafficOpensky1Mock.createTraffic());
    });


    // region callsign

    it('merge overwrites an emtpy old callsign with a non-empty new callsign', () => {
        acOld.callsign = undefined;
        acNew.callsign = 'SWR123';

        const newTrafficMap = openskyTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).callsign).toEqual('SWR123');
    });


    it('merge doesnt overwrite a non-emtpy old callsign with an empty new callsign', () => {
        acOld.callsign = 'SWR123';
        acNew.callsign = undefined;

        const newTrafficMap = openskyTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).callsign).toEqual('SWR123');
    });


    it('merge overwrites a non-emtpy old callsign with a non-empty new callsign', () => {
        acOld.callsign = 'SWR123';
        acNew.callsign = 'SWR321';

        const newTrafficMap = openskyTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).callsign).toEqual('SWR321');
    });

    // endregion


    // region positions

    it('merge adds a new traffic position', () => {
        acNew.positions[0].receivedTimestamp = Timestamp.createFromSec(acNew.positions[0].receivedTimestamp.epochSec + 1);
        acNew.positions[0].position.timestamp = Timestamp.createFromSec(acNew.positions[0].position.timestamp.epochSec + 1);
        acNew.positions[0].position.latitude = acNew.positions[0].position.latitude + 0.01;
        mockDate.nowMsResult = TrafficOpensky1Mock.createPos().position.timestamp.epochMs;

        const newTrafficMap = openskyTrafficMerger.merge(state, [acNew]);

        expect(newTrafficMap.size()).toEqual(1);
        expect(newTrafficMap.get(key).positions.length).toEqual(2);
    });

    // endregion
});
