import {AirportRunway} from './airport-runway';
import {Length} from '../../geo-math/domain-model/quantities/length';
import {LengthUnit} from '../../geo-math/domain-model/quantities/units';


describe('AirportRunway', () => {
    let rwy1, rwy2: AirportRunway;


    beforeEach(() => {
        rwy1 = new AirportRunway(
            '14/32',
            'ASPH',
            new Length(1730, LengthUnit.M),
            new Length(30, LengthUnit.M),
            138,
            318,
            new Length(1730, LengthUnit.M),
            new Length(1530, LengthUnit.M),
            new Length(1530, LengthUnit.M),
            new Length(1730, LengthUnit.M),
            true,
            true
        );

        rwy2 = new AirportRunway(
            '10L/28R',
            'ASPH',
            new Length(3618, LengthUnit.M),
            new Length(61, LengthUnit.M),
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
