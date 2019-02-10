import {Traffic, TrafficAddressType, TrafficAircraftType, TrafficDataSource} from './traffic';


describe('Traffic', () => {
    const mock1acAddress = '4B3142';
    const mock1addressType = TrafficAddressType.ICAO;
    const mock1DataSource = TrafficDataSource.OGN;
    const mock1AcType = TrafficAircraftType.POWERED_AIRCRAFT;
    const mock1IcaoType = 'AAT3';
    const mock1Registration = 'HB-SRA';
    const mock1Callsign = 'SWR123';
    const mock1OpCallsign = 'Swiss 123';
    const mock1AcModel =  'AT-3 R100';
    let mock1Traffic: Traffic;


    beforeEach(() => {
        mock1Traffic = new Traffic(
            mock1acAddress,
            mock1addressType,
            mock1DataSource,
            mock1AcType,
            mock1IcaoType,
            mock1Registration,
            mock1Callsign,
            mock1OpCallsign,
            mock1AcModel,
            []
        );
    });


    it('creates an instance', () => {
        expect(mock1Traffic.acAddress).toEqual(mock1acAddress);
        expect(mock1Traffic.addressType).toEqual(mock1addressType);
        expect(mock1Traffic.dataSource).toEqual(mock1DataSource);
        expect(mock1Traffic.acType).toEqual(mock1AcType);
        expect(mock1Traffic.icaoType).toEqual(mock1IcaoType);
        expect(mock1Traffic.registration).toEqual(mock1Registration);
        expect(mock1Traffic.callsign).toEqual(mock1Callsign);
        expect(mock1Traffic.opCallsign).toEqual(mock1OpCallsign);
        expect(mock1Traffic.acModel).toEqual(mock1AcModel);
    });


    it('clones an instance', () => {
        const traffic2 = mock1Traffic.clone();
        expect(traffic2.acAddress).toEqual(mock1acAddress);
        expect(traffic2.addressType).toEqual(mock1addressType);
        expect(traffic2.dataSource).toEqual(mock1DataSource);
        expect(traffic2.acType).toEqual(mock1AcType);
        expect(traffic2.icaoType).toEqual(mock1IcaoType);
        expect(traffic2.registration).toEqual(mock1Registration);
        expect(traffic2.callsign).toEqual(mock1Callsign);
        expect(traffic2.opCallsign).toEqual(mock1OpCallsign);
        expect(traffic2.acModel).toEqual(mock1AcModel);
    });
});
