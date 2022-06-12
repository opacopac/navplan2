import {Geometry2dType} from './geometry2d';
import {Position4d} from './position4d';
import {Timestamp} from '../quantities/timestamp';
import {Altitude} from './altitude';
import {AltitudeUnit} from './altitude-unit';
import {AltitudeReference} from './altitude-reference';


describe('Position4d', () => {
    beforeEach(() => {
    });


    it('can create an instance', () => {
        const timestamp = Timestamp.now();
        const pos = new Position4d(
            7.0,
            47.0,
            new Altitude(500, AltitudeUnit.FT, AltitudeReference.MSL),
            timestamp
        );

        expect(pos).toBeDefined();
        expect(pos.longitude).toEqual(7.0);
        expect(pos.latitude).toEqual(47.0);
        expect(pos.altitude).toEqual(new Altitude(500, AltitudeUnit.FT, AltitudeReference.MSL));
        expect(pos.timestamp).toEqual(timestamp);
        expect(pos.getGeometryType()).toEqual(Geometry2dType.POSITION);
    });


    it('can be cloned', () => {
        const pos1 = new Position4d(
            7.0,
            47.0,
            new Altitude(500, AltitudeUnit.FT, AltitudeReference.MSL),
            Timestamp.now()
        );
        const pos2 = pos1.clone();

        expect(pos2).toBeDefined();
        expect(pos2.longitude).toEqual(pos1.longitude);
        expect(pos2.latitude).toEqual(pos1.latitude);
        expect(pos2.altitude).toEqual(pos1.altitude);
        expect(pos2.timestamp).toEqual(pos1.timestamp);
    });
});
