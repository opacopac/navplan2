import {Traffic} from './traffic';
import {TrafficAircraftType} from './traffic-aircraft-type';
import {TrafficAddressType} from './traffic-address-type';
import {TrafficDataSource} from './traffic-data-source';
import {TrafficPosition} from './traffic-position';
import {TrafficPositionMethod} from './traffic-position-method';
import {Position4d} from '../../geo-math/domain/geometry/position4d';
import {Length} from '../../geo-math/domain/quantities/length';
import {LengthUnit} from '../../geo-math/domain/quantities/units';
import {Timestamp} from '../../geo-math/domain/quantities/timestamp';
import {TrafficAddress} from './traffic-address';


/*xdescribe('Traffic', () => {
    const mock1acAddress = new TrafficAddress('4B3142', TrafficAddressType.ICAO);
    const mock1DataSource = TrafficDataSource.OGN;
    const mock1AcType = TrafficAircraftType.POWERED_AIRCRAFT;
    const mock1IcaoType = 'AAT3';
    const mock1Registration = 'HB-SRA';
    const mock1Callsign = 'SWR123';
    const mock1OpCallsign = 'Swiss 123';
    const mock1AcModel =  'AT-3 R100';
    let mock1Traffic: Traffic;
    let mockPos1: TrafficPosition;


    beforeEach(() => {
        mock1Traffic = new Traffic(
            mock1acAddress,
            mock1DataSource,
            mock1AcType,
            mock1IcaoType,
            mock1Registration,
            mock1Callsign,
            mock1OpCallsign,
            mock1AcModel,
            []
        );

        mockPos1 = new TrafficPosition(
            new Position4d(7.0, 47.0, new Length(5000, LengthUnit.FT), Timestamp.now()),
            TrafficDataSource.OGN,
            TrafficPositionMethod.FLARM,
            'receiver',
            Timestamp.now().epochMs
        );
    });


    it('creates an instance', () => {
        expect(mock1Traffic.acAddress).toEqual(mock1acAddress);
        expect(mock1Traffic.addressType).toEqual(mock1addressType);
        expect(mock1Traffic.dataSource).toEqual(mock1DataSource);
        expect(mock1Traffic.acType).toEqual(mock1AcType);
        expect(mock1Traffic.acIcao).toEqual(mock1IcaoType);
        expect(mock1Traffic.registration).toEqual(mock1Registration);
        expect(mock1Traffic.callsign).toEqual(mock1Callsign);
        expect(mock1Traffic.fullCallsign).toEqual(mock1OpCallsign);
        expect(mock1Traffic.model).toEqual(mock1AcModel);
        expect(mock1Traffic.positions.length).toEqual(0);
        expect(mock1Traffic.isDetailsLoaded).toBeFalsy();
    });


    it('clones an instance', () => {
        mock1Traffic.positions.push(mockPos1);
        mock1Traffic.isDetailsLoaded = true;
        const traffic2 = mock1Traffic.clone();

        expect(traffic2.acAddress).toEqual(mock1acAddress);
        expect(traffic2.addressType).toEqual(mock1addressType);
        expect(traffic2.dataSource).toEqual(mock1DataSource);
        expect(traffic2.acType).toEqual(mock1AcType);
        expect(traffic2.acIcao).toEqual(mock1IcaoType);
        expect(traffic2.registration).toEqual(mock1Registration);
        expect(traffic2.callsign).toEqual(mock1Callsign);
        expect(traffic2.fullCallsign).toEqual(mock1OpCallsign);
        expect(traffic2.model).toEqual(mock1AcModel);
        expect(traffic2.positions.length).toEqual(1);
        expect(traffic2.isDetailsLoaded).toBeTruthy();
    });
});
*/
