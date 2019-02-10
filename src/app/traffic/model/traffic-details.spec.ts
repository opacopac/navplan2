import {AircraftClass, EngineClass, TrafficDetails} from './traffic-details';


describe('TrafficDetails', () => {
    const mock1Icao24 = '4B3142';
    const mock1Reg = 'HB-SRA';
    const mock1Model =  'AT-3 R100';
    const mock1Manufacturer = 'AERO AT SP. Z O.O.';
    const mock1AcType = 'AAT3';
    const mock1AcClass = AircraftClass.LANDPLANE;
    const mock1EngClass = EngineClass.PISTON;
    let mock1Traffic: TrafficDetails;


    beforeEach(() => {
        mock1Traffic = new TrafficDetails(
            mock1Icao24,
            mock1Reg,
            mock1Model,
            mock1Manufacturer,
            mock1AcType,
            mock1AcClass,
            mock1EngClass);
    });


    it('creates an instance', () => {
        expect(mock1Traffic.icao24).toEqual(mock1Icao24);
        expect(mock1Traffic.registration).toEqual(mock1Reg);
        expect(mock1Traffic.model).toEqual(mock1Model);
        expect(mock1Traffic.manufacturer).toEqual(mock1Manufacturer);
        expect(mock1Traffic.acType).toEqual(mock1AcType);
        expect(mock1Traffic.acClass).toEqual(mock1AcClass);
        expect(mock1Traffic.engineClass).toEqual(mock1EngClass);
    });


    it('creates an emtpy instance', () => {
        const trafficDetails = new TrafficDetails();
        expect(trafficDetails.icao24).toBeUndefined();
        expect(trafficDetails.registration).toBeUndefined();
        expect(trafficDetails.model).toBeUndefined();
        expect(trafficDetails.manufacturer).toBeUndefined();
        expect(trafficDetails.acType).toBeUndefined();
        expect(trafficDetails.acClass).toEqual(AircraftClass.UNKNOWN);
        expect(trafficDetails.engineClass).toEqual(EngineClass.UNKNOWN);
    });


    it('clones an instance', () => {
        const trafficDetails2 = mock1Traffic.clone();
        expect(trafficDetails2.icao24).toEqual(mock1Icao24);
        expect(trafficDetails2.registration).toEqual(mock1Reg);
        expect(trafficDetails2.model).toEqual(mock1Model);
        expect(trafficDetails2.manufacturer).toEqual(mock1Manufacturer);
        expect(trafficDetails2.acType).toEqual(mock1AcType);
        expect(trafficDetails2.acClass).toEqual(mock1AcClass);
        expect(trafficDetails2.engineClass).toEqual(mock1EngClass);
    });
});
