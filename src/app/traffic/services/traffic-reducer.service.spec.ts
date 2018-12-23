import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from '../model/traffic';
import {TrafficPosition, TrafficPositionMethod} from '../model/traffic-position';
import {Position4d} from '../../shared/model/geometry/position4d';
import {Altitude} from '../../shared/model/quantities/altitude';
import {LengthUnit} from '../../shared/model/units';
import {Timestamp} from '../../shared/model/quantities/timestamp';
import {TrafficReducerService} from './traffic-reducer.service';


describe('TrafficReducerService', () => {
    let pos1, pos2, pos3: TrafficPosition;
    let acOld, acNew1, acNew2: Traffic;
    let trafficMap: Map<string, Traffic>;
    let newTrafficList: Traffic[];


    function createPos(lon: number, lat: number, timestampSec?: number): TrafficPosition {
        const timestamp = timestampSec ? new Timestamp(timestampSec) : Timestamp.now();
        return new TrafficPosition(
            new Position4d(lon, lat, new Altitude(2000, LengthUnit.FT), timestamp),
            TrafficDataSource.OPENSKY,
            TrafficPositionMethod.ADSB,
            'rec123',
            timestamp.getMs()
        );
    }


    function getMapKey(ac: Traffic): string {
        return ac.addressType + '_' + ac.acAddress.toUpperCase();
    }


    beforeEach(() => {
        const timSec = Timestamp.now().epochSec;
        pos1 = createPos(7.0, 47.0, timSec - 3);
        pos2 = createPos(7.1, 47.1, timSec - 2);
        pos3 = createPos(7.2, 47.2, timSec - 1);
        acOld = new Traffic(
            'AAAAAA',
            TrafficAddressType.ICAO,
            TrafficDataSource.OGN,
            TrafficAircraftType.UNKNOWN,
            '',
            '',
            'Topswiss 456',
            '',
            [pos1, pos2]);
        trafficMap = new Map<string, Traffic>();
        trafficMap.set(getMapKey(acOld), acOld);

        acNew1 = acOld.clone();
        acNew1.acAddress = 'AAAAAA';
        acNew1.positions = [pos3];
        acNew2 = acOld.clone();
        acNew2.acAddress = 'BBBBBB';
        newTrafficList = [acNew1, acNew2];
    });


    it('it merges the new traffic into the traffic map', () => {
        const newTrafficMap = TrafficReducerService.reduceTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.size).toBe(2);
    });


    it('it removes traffic without positions from the map', () => {
        acOld.positions = [];
        acNew1.positions = [];
        const newTrafficMap = TrafficReducerService.reduceTrafficMap(trafficMap, newTrafficList);

        expect(newTrafficMap.size).toBe(1);
        expect(newTrafficMap.get(getMapKey(acOld))).toBeUndefined();
    });
});
