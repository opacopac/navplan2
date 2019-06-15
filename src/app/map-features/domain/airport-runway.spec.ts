import {AirportRunway} from './airport-runway';


describe('AirportRunway', () => {
    let rwy1, rwy2: AirportRunway;


    beforeEach(() => {
        rwy1 = new AirportRunway(
            '14/32',
            'ASPH',
            1730,
            30,
            138,
            318,
            1730,
            1530,
            1530,
            1730,
            true,
            true
        );

        rwy2 = new AirportRunway(
            '10L/28R',
            'ASPH',
            3618,
            61,
            100,
            280,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        );
    });


    it('creates an instance', () => {
        expect(rwy1).toBeDefined();
    });


    it('states correctly if magnetic variation is included in the direction', () => {
        const containsMagVar1 = rwy1.directionContainsMagneticVariation();
        const containsMagVar2 = rwy2.directionContainsMagneticVariation();

        expect(containsMagVar1).toBeTruthy();
        expect(containsMagVar2).toBeFalsy();
    });
});
